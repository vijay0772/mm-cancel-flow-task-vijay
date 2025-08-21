"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { finalizeCancellation } from "@/lib/cancelApi";

export default function MMYesNoPage() {
	const router = useRouter();
	const [visa, setVisa] = useState("");
	const isValid = visa.trim().length > 0;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative mx-4 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
				{/* Desktop header */}
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
							<span className="inline-block w-8 h-2 rounded-full bg-gray-200" />
							<span className="ml-1">Step 3 of 3</span>
						</div>
					</div>
				</div>
			{/* Header - mobile (progress below title) */}
			 <div className="relative px-4 py-3 border-b border-gray-200 md:hidden">
			          <div className="flex flex-col items-left gap-2">
			            <p className="text-[16px] font-bold text-[#62605C]">
			              Subscription Cancellation
			            </p>
			            <div className="flex items-left gap-2 text-[12px] leading-none text-[#62605C]">
			              <span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
			              <span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
			              <span className="inline-block h-2 w-8 rounded-full bg-gray-200" />
			              <span className="ml-1">Step 3 of 3</span>
			            </div>
			          </div>
			          <button
			            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62605C] hover:text-gray-800"
			            onClick={() => router.push("/")}
			            aria-label="Close"
			          >
			            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
			            </svg>
			          </button>
			        </div>
				
				 {/* Mobile back row */}
				 <div className="px-4 py-3 md:hidden">
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

						<div className="border-b border-gray-200 my-4 md:hidden" />

						<p className="mt-0 md:mt-6 text-[14px] text-[#62605C] font-bold ">Is your company providing an immigration lawyer to help with your visa?</p>

						<div className="mt-3 space-y-3">
                        <label className="flex items-center gap-3">
								<input type="radio" className="sr-only" checked readOnly />
								<span className="w-5 h-5 rounded-full flex items-center justify-center bg-[#41403D]">
									<span className="w-2.5 h-2.5 rounded-full bg-white" />
								</span>
								<span className="text-[14px] text-[#62605C]">No</span>
							</label>
						</div>

						<p className="mt-4 text-[14px] text-[#41403D]">We can connect you with one of our trusted partners.<br/>Which visa would you like to apply for?*</p>
						<input className="mt-2 w-full h-[40px] rounded-md border text-gray-900 border-[#62605C] px-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#9A6FFF]" placeholder="" value={visa} onChange={(e) => setVisa(e.target.value)} />

						<div className="border-t border-gray-200 pt-4 mt-4">
							<button
								disabled={!isValid}
								onClick={async () => { if (!isValid) return; await finalizeCancellation({ reason: "MM-YES no lawyer - visa: " + visa.trim(), accepted: false }); router.push("/found-job/complete-yes"); }}
								className={`w-full h-[32px] rounded-md px-3 text-[12px] font-medium transition-colors ${
									isValid ? "bg-[#8952fc] text-white hover:bg-[#7b40fc]" : "bg-gray-100 text-[#62605C] cursor-not-allowed"
								}`}
							>
								Complete cancellation
							</button>
						</div>
					</div>

					<div className="order-1 md:order-2 hidden md:flex md:justify-end md:items-start">
						<div className="relative w-[400px] h-[335px] rounded-[12px] overflow-hidden">
							<img src="/OYN.png" alt="City image" />						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 