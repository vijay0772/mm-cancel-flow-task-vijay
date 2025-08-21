"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { finalizeCancellation } from "@/lib/cancelApi";

export default function MMYesPage() {
	const router = useRouter();
	const [visaType, setVisaType] = useState("");
	const isValid = visaType.trim().length > 0;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative mx-4 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
				<div className="relative px-6 py-4 border-b border-gray-200 hidden md:block">
					<button className="absolute left-6 top-1/2 -translate-y-1/2 text-sm text-gray-700 flex items-center gap-1" onClick={() => router.back()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
					<div className="flex items-center justify-center gap-3">
						<p className="text-[14px] font-bold text-gray-800">Subscription Cancellation</p>
						<div className="flex items-center gap-2 text-xs text-gray-600">
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-gray-400" />
							<span className="ml-1">Step 3 of 3</span>
						</div>
					</div>
					<button
						className="absolute right-6 top-1/2 -translate-y-1/2 text-[#62605C] hover:text-gray-800"
						onClick={() => router.push("/")}
						aria-label="Close"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				{/* Header - mobile */}
				<div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between md:hidden">
					<div className="flex items-center gap-3">
						<p className="text-[14px] font-bold text gray-800">Subscription Cancellation</p>
						<div className="flex items-center gap-2 text-xs text-gray-600">
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-gray-400" />
							<span className="ml-1">Step 3 of 3</span>
						</div>
					</div>
					<button aria-label="Close" onClick={() => router.back()} className="p-2 text-gray-600">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>
				<div className="px-4 py-3  md:hidden">
					<button className="text-sm text-gray-700 flex items-center gap-1" onClick={() => router.back()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
				</div>

				<div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_400px] gap-0 md:gap-8 p-6 md:p-8 md:items-start">
					<div className="order-2 md:order-1">
					<h2 className="text-[36px] md:text-[32px] font-semibold text-[#41403D]  leading-none">You landed the job!</h2>
						<p className="mt-0 text-[36px] italic font-bold text-[#41403D] leading-none">That’s what we live for.</p>
						<p className="mt-2 text-[16px] font-bold md:text-[16px] text-[#41403D] leading-tight">
							Even if it wasn’t through Migrate Mate,<br className="hidden md:block" />
							let us help get your visa sorted.
						</p>

						<p className="mt-2 text-[14px] text-gray-900">Is your company providing an immigration lawyer to help with your visa?</p>

						<div className="mt-3 space-y-3">
							<label className="flex items-center gap-3 cursor-pointer select-none">
								<input type="radio" className="sr-only" checked readOnly />
								<span className="w-5 h-5 rounded-full flex items-center justify-center bg-[#41403D]">
									<span className="w-2.5 h-2.5 rounded-full bg-white" />
								</span>
								<span className="text-[14px] text-[#41403D]">Yes</span>
							</label>
						</div>

						<p className="mt-3 text-[14px] text-gray-900">What visa will you be applying for?*</p>
						<input
							className="mt-2 w-full h-[40px] rounded-md border border-[#62605C] text-gray-900 px-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#9A6FFF]"
							placeholder=""
							value={visaType}
							onChange={(e) => setVisaType(e.target.value)}
						/>

						
						<div className="border-t border-gray-200 pt-4 mt-3">
							<button
								disabled={!isValid}
								onClick={async () => { if (!isValid) return; await finalizeCancellation({ reason: "Company lawyer - visa: " + visaType.trim(), accepted: false }); router.push("/found-job/complete"); }}
								className={`w-full h-[32px] rounded-md px-3 text-[12px] font-medium transition-colors ${
									isValid ? "bg-[#8952fc] text-white hover:bg-[#7b40fc]" : "bg-gray-100 text-gray-400 cursor-not-allowed"
								}`}
							>
								Complete cancellation
							</button>
						</div>
					</div>

					<div className="order-1 md:order-2 hidden md:flex md:justify-end md:items-start">
						<div className="relative w-[400px] h-[335px] rounded-[12px] overflow-hidden bg-transparent ring-0 outline-none shadow-none drop-shadow-none border-0 select-none">
						<img src="/ON3.png" alt="City image" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}