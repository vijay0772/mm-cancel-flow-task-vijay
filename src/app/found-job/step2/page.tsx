"use client";


import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { RootState } from "../../../store";
import { setStep2Feedback } from "../../../store/cancelFlowSlice";

export default function Step2Page() {
	const dispatch = useDispatch();
	const router = useRouter();
	const saved = useSelector((s: RootState) => s.cancelFlow.step2Feedback);
	const jobFoundWithMM = useSelector((s: RootState) => s.cancelFlow.step1.jobFoundViaMigrateMate);
	const [value, setValue] = useState("");

	useEffect(() => {
		setValue(saved ?? "");
	}, [saved]);

	const min = 25;
	const isValid = value.trim().length >= min;

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-start md:items-center overflow-y-auto text-[#41403D]">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative mx-4 my-6 md:my-8 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)] md:max-h-[90vh]">
				{/* Header - desktop */}
				<div className="relative px-6 py-4 border-b border-gray-200 hidden md:block">
					<button className="absolute left-6 top-1/2 -translate-y-1/2 text-sm text-[#41403D] flex items-center gap-1" onClick={() => router.back()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
					<div className="flex items-center justify-center gap-3">
						<p className="text-[14px] font-bold text-[#41403D]">Subscription Cancellation</p>
						<div className="flex items-center gap-2 text-xs text-[#41403D]">
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-gray-400" />
							<span className="inline-block w-8 h-2 rounded-full bg-gray-200" />
							<span className="ml-1">Step 2 of 3</span>
						</div>
					</div>
				</div>

				{/* Header - mobile (progress below title) */}
				<div className="relative px-4 py-3 border-b border-gray-200 md:hidden">
					<div className="flex flex-col items-left gap-2">
						<p className="text-[16px] font-bold text-[#62605C]">Subscription Cancellation</p>
						<div className="flex items-left gap-2 text-[12px] leading-none text-[#62605C]">
							<span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
							<span className="inline-block h-2 w-8 rounded-full bg-gray-200" />
							<span className="inline-block h-2 w-8 rounded-full bg-gray-200" />
							<span className="ml-1">Step 2 of 3</span>
						</div>
					</div>
					<button
						className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62605C]"
						onClick={() => router.push("/")}
						aria-label="Close"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div className="px-4 py-3  md:hidden">
					<button className="text-sm text-[#62605C] flex items-center gap-1"onClick={() => router.back()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
				</div>

				{/* Body */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 p-6 md:p-8">
					{/* Left */}
					<div className="order-2 md:order-1">
						<h2 className="text-[32px] md:text-[30px] font-semibold text-[#41403D] leading-tight">What’s one thing you wish we could’ve helped you with?</h2>
						<p className="mt-4 text-[14px] text-[#41403D]">We’re always looking to improve, your thoughts can help us make Migrate Mate more useful for others.*</p>

						<div className="mt-4 relative">
							<textarea
								value={value}
								onChange={(e) => setValue(e.target.value)}
								className="w-full h-40 border border-gray-300 rounded-lg p-3 pr-24 pb-8 focus:outline-none focus:ring-2 focus:ring-[#9A6FFF]"
								placeholder="Type your feedback here..."
							/>
							<div className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-[#41403D]">Min 25 characters ({value.trim().length}/{min})</div>
						</div>

						<div className="border-t border-gray-200 pt-2 mt-2">
							<button
								disabled={!isValid}
								onClick={() => {
									dispatch(setStep2Feedback(value.trim()));
									if (jobFoundWithMM === "no") {
										router.push("/found-job/mm-no");
									} else {
										router.push("/found-job/mm-yes");
									}
								}}
								className={`w-full h-[40px] rounded-md px-4 text-[13px] font-medium transition-colors ${
									isValid ? "bg-[#8952fc] text-white hover:bg-[#7b40fc]" : "bg-gray-100 text-gray-400 cursor-not-allowed"
								}`}
							>
								Continue
							</button>
						</div>
					</div>

					{/* Right: image (desktop only) */}
					<div className="order-1 md:order-2 items-start hidden md:flex">
						<img src="/01.png" alt="Step image" />
					</div>
				</div>
			</div>
		</div>
	);
} 