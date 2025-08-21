import { NextResponse } from 'next/server'
import { randomInt } from 'crypto'
import { supabaseAdmin } from '@/lib/supabase'

function isUuid(v: unknown): v is string {
  return typeof v === 'string' && /^[0-9a-fA-F-]{36}$/.test(v)
}

function originAllowed(req: Request) {
  const allowedEnv = process.env.NEXT_PUBLIC_APP_ORIGIN || ''
  if (!allowedEnv) return true

  const allowedList = allowedEnv
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  const origin = req.headers.get('origin') || ''
  if (origin) {
    try {
      const o = new URL(origin)
      for (const a of allowedList) {
        const au = new URL(a)
        if (o.origin === au.origin) return true
      }
    } catch {
      // fall through
    }
  }

  // Fallback: if Origin is missing, allow when the Host matches any allowed host (same-origin SSR/CSR)
  const host = req.headers.get('host') || ''
  if (host) {
    for (const a of allowedList) {
      try {
        const au = new URL(a)
        if (host === au.host) return true
      } catch {
        // ignore malformed allowed entries
      }
    }
  }

  return false
}

type StartPayload = { user_id: string; subscription_id: string }

type CancellationRow = {
  id: string
  user_id: string
  subscription_id: string
  downsell_variant: 'A' | 'B'
  reason: string | null
  accepted_downsell: boolean | null
  created_at: string
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { user_id, subscription_id } = (payload ?? {}) as Partial<StartPayload>
  if (!isUuid(user_id) || !isUuid(subscription_id)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const { data: existing, error: fetchErr } = await supabaseAdmin
    .from('cancellations')
    .select('*')
    .eq('user_id', user_id)
    .eq('subscription_id', subscription_id)
    .order('created_at', { ascending: false })
    .limit(1)

  if (fetchErr) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  let variant: 'A' | 'B'
  if (existing && existing.length > 0) {
    const row = existing[0] as CancellationRow
    variant = row.downsell_variant
  } else {
    variant = randomInt(0, 2) === 0 ? 'A' : 'B'

    const { error: insertErr } = await supabaseAdmin.from('cancellations').insert({
      user_id,
      subscription_id,
      downsell_variant: variant,
      reason: null,
      accepted_downsell: null
    })
    if (insertErr) {
      return NextResponse.json({ error: 'Failed to persist variant' }, { status: 500 })
    }

    const { error: subErr } = await supabaseAdmin
      .from('subscriptions')
      .update({ status: 'pending_cancellation' })
      .eq('id', subscription_id)
      .eq('user_id', user_id)
    if (subErr) {
      return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 })
    }
  }

  const res = NextResponse.json({ variant })
  res.cookies.set('downsell_variant', variant, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  })
  return res
} 