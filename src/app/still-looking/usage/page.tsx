"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function StillLookingUsagePage() {
	const router = useRouter();
	const [q1, setQ1] = useState<string | null>(null);
	const [q2, setQ2] = useState<string | null>(null);
	const [q3, setQ3] = useState<string | null>(null);
	const canContinue = q1 !== null && q2 !== null && q3 !== null;

	const Pill = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
		<button
			onClick={onClick}
			className={`h-10 rounded-md border px-3 md:px-7 text-[11px] md:text-[12px] leading-none whitespace-nowrap font-semibold transition-colors ${
				selected ? "bg-[#7C5CFF] text-white border-transparent" : "bg-[#F6F6F6] text-[#62605C] border-gray-300 hover:bg-gray-50"
			}`}
		>
			{label}
		</button>
	);

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-start md:items-center overflow-y-auto">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative mx-4 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
				{/* Header - desktop */}
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
							<span className="inline-block w-8 h-2 rounded-full bg-gray-300" />
							<span className="inline-block w-8 h-2 rounded-full bg-gray-200" />
							<span className="ml-1">Step 2 of 3</span>
						</div>
					</div>
				<button aria-label="Close" onClick={() => router.back()} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#62605C]">
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
							<span className="inline-block h-2 w-8 rounded-full bg-gray-300" />
							<span className="inline-block h-2 w-8 rounded-full bg-gray-200" />
							<span className="ml-1">Step 2 of 3</span>
						</div>
					</div>
					<button aria-label="Close" onClick={() => router.back()} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62605C] md:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Back row - mobile */}
				<div className="px-4 py-3 md:hidden">
					<button className="text-sm text-[#62605C] flex items-center gap-1" onClick={() => router.back()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
				</div>

				{/* Body */}
				<div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_400px] gap-0 md:gap-8 p-6 md:p-8 md:items-stretch">
					{/* Left column */}
					<div className="order-2 md:order-1 self-start pt-[2px]">
						<h2 className="text-[32px] font-semibold text-[#1f2937] leading-tight">Help us understand how you were using Migrate Mate.</h2>

						{/* Q1 */}
						<div className="mt-6">
							<p className="text-[14px] text-[#62605C] mb-2">How many roles did you apply for through Migrate Mate?</p>
							<div className="grid grid-cols-4 gap-2 md:gap-4">
								<Pill label="0" selected={q1 === "0"} onClick={() => setQ1("0")} />
								<Pill label="1–5" selected={q1 === "1-5"} onClick={() => setQ1("1-5")} />
								<Pill label="6–20" selected={q1 === "6-20"} onClick={() => setQ1("6-20")} />
								<Pill label="20+" selected={q1 === "20+"} onClick={() => setQ1("20+")} />
							</div>
						</div>

						{/* Q2 */}
						<div className="mt-6">
							<p className="text-[14px] text-[#62605C] mb-2">How many companies did you email directly?</p>
							<div className="grid grid-cols-4 gap-2 md:gap-4">
								<Pill label="0" selected={q2 === "0"} onClick={() => setQ2("0")} />
								<Pill label="1–5" selected={q2 === "1-5"} onClick={() => setQ2("1-5")} />
								<Pill label="6–20" selected={q2 === "6-20"} onClick={() => setQ2("6-20")} />
								<Pill label="20+" selected={q2 === "20+"} onClick={() => setQ2("20+")} />
							</div>
						</div>

						{/* Q3 */}
						<div className="mt-6">
							<p className="text-[14px] text-[#62605C] mb-2">How many different companies did you interview with?</p>
							<div className="grid grid-cols-4 gap-2 md:gap-4">
								<Pill label="0" selected={q3 === "0"} onClick={() => setQ3("0")} />
								<Pill label="1–2" selected={q3 === "1-2"} onClick={() => setQ3("1-2")} />
								<Pill label="3–5" selected={q3 === "3-5"} onClick={() => setQ3("3-5")} />
								<Pill label="5+" selected={q3 === "5+"} onClick={() => setQ3("5+")} />
							</div>
						</div>

						{/* Offer & Continue */}
						<div className="mt-7">
							<button onClick={() => router.push("/still-looking/confirm")} className="w-full h-[44px] rounded-lg bg-[#3BB052] text-white font-semibold">
								Get 50% off | $12.50 <span className="text-[12px] align-top opacity-80 ml-1 line-through">$25</span>
							</button>
							<button
								disabled={!canContinue}
								onClick={() => {
									if (!canContinue) return;
									router.push("/still-looking/reason");
								}}
								className={`mt-4 w-full h-[44px] rounded-lg font-semibold ${canContinue ? "bg-[#E53935] text-white" : "bg-gray-100 text-gray-400"}`}
							>
								Continue
							</button>
						</div>
					</div>

					{/* Right image */}
					<div className="order-1 md:order-2 hidden md:flex md:flex-col md:justify-between md:items-end self-stretch relative">
						<div className="relative w-[400px] h-[335px]">
							<img src="/VN3.png" alt="City image" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 