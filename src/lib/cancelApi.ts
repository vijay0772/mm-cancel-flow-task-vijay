// Lightweight client helpers for cancellation API

import { showToast } from '@/lib/toast'

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN || ''
const DEFAULT_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID || ''
const DEFAULT_SUB_ID = process.env.NEXT_PUBLIC_DEMO_SUBSCRIPTION_ID || ''

function getIds(overrides?: { userId?: string; subscriptionId?: string }) {
  const userId = overrides?.userId || DEFAULT_USER_ID
  const subscriptionId = overrides?.subscriptionId || DEFAULT_SUB_ID
  if (!userId || !subscriptionId) {
    console.warn('Cancellation IDs are missing. Set NEXT_PUBLIC_DEMO_USER_ID and NEXT_PUBLIC_DEMO_SUBSCRIPTION_ID for demo wiring.')
  }
  return { userId, subscriptionId }
}

export async function startCancellation(overrides?: { userId?: string; subscriptionId?: string }) {
  const { userId, subscriptionId } = getIds(overrides)
  if (!userId || !subscriptionId) return { ok: false }
  try {
    const res = await fetch('/api/cancellations/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(APP_ORIGIN ? { 'X-App-Origin': APP_ORIGIN } : {}) },
      credentials: 'include',
      body: JSON.stringify({ user_id: userId, subscription_id: subscriptionId })
    })
    if (!res.ok) {
      showToast('error', 'Could not start cancellation')
      return { ok: false }
    }
    const data = await res.json()
    showToast('success', `Cancellation started (variant ${data.variant})`)
    return data
  } catch {
    showToast('error', 'Could not start cancellation')
    return { ok: false }
  }
}

export async function finalizeCancellation(params: {
  reason: string | null
  accepted: boolean
  overrides?: { userId?: string; subscriptionId?: string }
}) {
  const { userId, subscriptionId } = getIds(params.overrides)
  if (!userId || !subscriptionId) return { ok: false }
  try {
    const res = await fetch('/api/cancellations/reason', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(APP_ORIGIN ? { 'X-App-Origin': APP_ORIGIN } : {}) },
      credentials: 'include',
      body: JSON.stringify({
        user_id: userId,
        subscription_id: subscriptionId,
        reason: params.reason,
        accepted_downsell: params.accepted
      })
    })
    if (!res.ok) {
      showToast('error', 'Could not finalize cancellation')
      return { ok: false }
    }
    const data = await res.json()
    showToast('success', 'Cancellation saved')
    return data
  } catch {
    showToast('error', 'Could not finalize cancellation')
    return { ok: false }
  }
} 