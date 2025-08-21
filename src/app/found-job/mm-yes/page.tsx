"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function MMYesEntryPage() {
	const router = useRouter();
	const [answer, setAnswer] = React.useState<"yes" | "no" | null>(null);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
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
							<span className="inline-block w-8 h-2 rounded-full  bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-gray-200" />
							<span className="ml-1">Step 3 of 3</span>
						</div>
					</div>
				</div>

				{/* Header - mobile (progress below title) */}
				<div className="relative px-4 py-3 border-b border-gray-200 md:hidden">
					<div className="flex flex-col items-left gap-2">
						<p className="text-[16px] font-bold text-[#62605C]">Subscription Cancellation</p>
						<div className="flex items-left gap-2 text-[12px] leading-none text-[#62605C]">
							<span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
							<span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
							<span className="inline-block h-2 w-8 rounded-full bg-gray-200" />
							<span className="ml-1">Step 3 of 3</span>
						</div>
					</div>
					<button aria-label="Close" onClick={() => router.back()} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62605C]">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div className="px-4 py-3  md:hidden">
					<button className="text-sm text-[#62605C] flex items-center gap-1" onClick={() => router.back()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
				</div>

				<div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_400px] gap-0 md:gap-8 p-6 md:p-6 md:items-start">
					<div className="order-2 md:order-1">
						<h2 className="text-[28px] md:text-[32px] font-semibold text-[#41403D] leading-tight mt-4 md:mt-1">We helped you land the job, now<br/>let’s help you secure your visa.</h2>

						{/* Mobile divider under title */}
						<div className="border-b border-gray-200 my-4 md:hidden" />

						<p className="mt-0 md:mt-6 text-[14px] text-[#62605C] font-bold">Is your company providing an immigration lawyer to help with your visa?</p>

						<div className="mt-3 space-y-3">
							<label className="flex items-center gap-3 cursor-pointer">
								<input type="radio" name="visa" className="sr-only" checked={answer === "yes"} onChange={() => setAnswer("yes")} />
								<span className={`w-5 h-5 rounded-full flex items-center justify-center ${answer === "yes" ? "bg-[#41403D]" : "border-2 border-gray-400"}`}>
									<span className={`w-2.5 h-2.5 rounded-full ${answer === "yes" ? "bg-white" : "bg-transparent"}`} />
								</span>
								<span className="text-[14px] font-bold text-[#62605C]">Yes</span>
							</label>
							<label className="flex items-center gap-3 cursor-pointer">
								<input type="radio" name="visa" className="sr-only" checked={answer === "no"} onChange={() => setAnswer("no")} />
								<span className={`w-5 h-5 rounded-full flex items-center justify-center ${answer === "no" ? "bg-[#41403D]" : "border-2 border-gray-400"}`}>
									<span className={`w-2.5 h-2.5 rounded-full ${answer === "no" ? "bg-white" : "bg-transparent"}`} />
								</span>
								<span className="text-[14px] font-bold text-[#62605C]">No</span>
							</label>
						</div>

						<div className="border-t border-gray-200 pt-4 mt-4">
							<button
								disabled={!answer}
								onClick={() => {
									if (answer === "yes") router.push("/found-job/mm-yes/yes");
									if (answer === "no") router.push("/found-job/mm-yes/no");
								}}
								className={`w-full h-[32px] rounded-md px-3 text-[12px] font-bold transition-colors ${
									answer ? "bg-[#8952fc] text-white hover:bg-[#7b40fc]" : "bg-gray-100 text-[#62605C] cursor-not-allowed"
								}`}
							>
								Complete cancellation
							</button>
						</div>
					</div>

					<div className="order-1 md:order-2 hidden md:flex md:justify-end md:items-start">
						<img src="/OY1.png" alt="City image" />
					</div>
				</div>
			</div>
		</div>
	);
} 