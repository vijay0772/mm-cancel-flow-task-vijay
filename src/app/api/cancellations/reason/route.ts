import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function isUuid(v: unknown): v is string {
  return typeof v === 'string' && /^[0-9a-fA-F-]{36}$/.test(v)
}

function originAllowed(req: Request) {
  const origin = req.headers.get('origin') || ''
  const allowed = process.env.NEXT_PUBLIC_APP_ORIGIN || ''
  if (!allowed) return true
  try {
    const o = new URL(origin)
    const a = new URL(allowed)
    return o.origin === a.origin
  } catch {
    return false
  }
}

type ReasonPayload = {
  user_id: string
  subscription_id: string
  reason: string | null
  accepted_downsell: boolean
}

type CancellationRow = {
  id: string
  downsell_variant: 'A' | 'B'
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

  const { user_id, subscription_id, reason = null, accepted_downsell } = (payload ?? {}) as Partial<ReasonPayload>
  if (!isUuid(user_id) || !isUuid(subscription_id) || typeof accepted_downsell !== 'boolean') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
  if (reason !== null && typeof reason !== 'string') {
    return NextResponse.json({ error: 'Invalid reason' }, { status: 400 })
  }

  const { data: rows, error: selErr } = await supabaseAdmin
    .from('cancellations')
    .select('*')
    .eq('user_id', user_id)
    .eq('subscription_id', subscription_id)
    .order('created_at', { ascending: false })
    .limit(1)

  if (selErr || !rows || rows.length === 0) {
    return NextResponse.json({ error: 'Cancellation not initialized' }, { status: 400 })
  }

  const cancellation = rows[0] as CancellationRow

  const { error: updErr } = await supabaseAdmin
    .from('cancellations')
    .update({ reason, accepted_downsell })
    .eq('id', cancellation.id)

  if (updErr) {
    return NextResponse.json({ error: 'Failed to finalize cancellation' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, downsell_variant: cancellation.downsell_variant })
}
