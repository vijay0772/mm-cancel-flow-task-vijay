'use client'

import { useEffect, useState } from 'react'

type ToastItem = { id: number; type: 'success' | 'error'; text: string }

let emitToast: ((t: Omit<ToastItem, 'id'>) => void) | null = null

export function ToastContainer() {
	const [items, setItems] = useState<ToastItem[]>([])

	useEffect(() => {
		emitToast = ({ type, text }) => {
			const id = Date.now() + Math.floor(Math.random() * 1000)
			setItems((prev) => [...prev, { id, type, text }])
			setTimeout(() => {
				setItems((prev) => prev.filter((i) => i.id !== id))
			}, 2800)
		}
		return () => {
			emitToast = null
		}
	}, [])

	return (
		<div className="pointer-events-none fixed top-4 right-4 z-[2000] space-y-2">
			{items.map((i) => (
				<div
					key={i.id}
					className={`pointer-events-auto rounded-md px-3 py-2 text-sm text-white shadow ${
						i.type === 'success' ? 'bg-green-600' : 'bg-red-600'
					}`}
				>
					{i.text}
				</div>
			))}
		</div>
	)
}

export function showToast(type: 'success' | 'error', text: string) {
	if (typeof window !== 'undefined' && emitToast) emitToast({ type, text })
} 