"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { finalizeCancellation } from "@/lib/cancelApi";

export default function OtherReasonPage() {
	const router = useRouter();
	const [feedback, setFeedback] = useState("");
	const valid = feedback.trim().length >= 25;

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-start md:items-center overflow-y-auto">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative mx-4 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
				<div className="relative px-6 py-4 border-b border-gray-200 hidden md:block">
					<button className="absolute left-6 top-1/2 -translate-y-1/2 text-sm text-[#62605C] flex items-center gap-1" onClick={() => router.back()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
					<div className="flex items-center justify-center gap-3">
						<p className="text-[14px] font-bold text-[#62605C]">Subscription Cancellation</p>
						<div className="flex items-center gap-2 text-xs text-[#62605C]">
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-gray-300" />
							<span className="ml-1">Step 3 of 3</span>
						</div>
					</div>
					<button aria-label="Close" onClick={() => router.back()} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#62605C] hidden md:block">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Header - mobile (progress below title) */}
				<div className="relative px-4 py-3 border-b border-gray-200 md:hidden">
					<div className="flex flex-col items-left gap-2">
						<p className="text-[16px] font-bold text-[#62605C]">Subscription Cancellation</p>
						<div className="flex items-left gap-2 text-[12px] leading-none text-[#62605C]">
							<span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
							<span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
							<span className="inline-block h-2 w-8 rounded-full bg-gray-300" />
							<span className="ml-1">Step 3 of 3</span>
						</div>
					</div>
					<button aria-label="Close" onClick={() => router.back()} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62605C] md:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div className="px-4 py-3 md:hidden">
					<button className="text-sm text-[#62605C] flex items-center gap-1" onClick={() => router.back()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
				</div>

				<div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_400px] gap-0 md:gap-8 p-6 md:p-8 md:items-stretch">
					<div className="order-2 md:order-1 self-start">
						<h2 className="text-[32px] font-semibold text-[#1f2937] leading-tight">What’s the main reason?</h2>
						<p className="mt-2 text-[14px] font-bold text-[#62605C]">Please take a minute to let us know why:</p>

						<label className="mt-4 flex items-center gap-3 cursor-default select-none text-[#1f2937]">
							<span className="w-5 h-5 rounded-full flex items-center justify-center bg-[#41403D]">
								<span className="w-2.5 h-2.5 rounded-full bg-white" />
							</span>
							<span>Other</span>
						</label>

						<p className="mt-2 text-[14px] text-[#1f2937]">What would have helped you the most?*</p>
						<div className="mt-2 relative">
							<textarea
								value={feedback}
								onChange={(e) => setFeedback(e.target.value)}
								className={`w-full min-h-[160px] rounded-md border px-4 pr-24 pb-8 pt-3 text-[14px] text-[#41403D] ${valid ? "border-gray-300" : "border-[#62605C] 500"}`}
								placeholder=""
							/>
							<div className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-[#62605C]">Min 25 characters ({feedback.length}/25)</div>
						</div>

						<div className="border-t border-gray-200 pt-4 mt-4">
							<button onClick={() => router.push("/still-looking/confirm")} className="w-full h-[44px] rounded-lg bg-[#3BB052] text-white font-semibold">
								Get 50% off | $12.50 <span className="text-[12px] align-top opacity-80 ml-1 line-through">$25</span>
							</button>
							<button disabled={!valid} onClick={async () => { if (!valid) return; await finalizeCancellation({ reason: feedback.trim(), accepted: false }); router.push("/still-looking/completed"); }} className={`mt-5 w-full h-[44px] rounded-lg font-semibold ${valid ?  "bg-[#DC2626] text-white" : "bg-[#E6E6E6] text-[#B5B3AF]"}`}>
								Complete cancellation
							</button>
						</div>
					</div>

					<div className="order-1 md:order-2 hidden md:flex md:flex-col md:justify-between md:items-end self-stretch relative">
						<div className="relative w-[400px] h-[335px]">
							<img src="/VN6.png" alt="City image" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 