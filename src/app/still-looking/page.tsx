"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { startCancellation } from "@/lib/cancelApi";

export default function StillLookingPage() {
	const router = useRouter();
	const [variant, setVariant] = useState<'A' | 'B' | null>(null);

	useEffect(() => {
		(async () => {
			const res = await startCancellation();
			if (res && res.variant) setVariant(res.variant);
		})();
	}, []);

	// Compute display prices based on variant; only numbers change, markup stays as-is
	const priceCurrent = variant === 'B' ? '$15.00' : '$12.50';
	const priceStrikethrough = variant === 'B' ? '$25 /month' : '$25 /month';

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
							<span className="inline-block w-8 h-2 rounded-full bg-gray-400" />
							<span className="inline-block w-8 h-2 rounded-full bg-gray-200" />
							<span className="inline-block w-8 h-2 rounded-full bg-gray-200" />
							<span className="ml-1">Step 1 of 3</span>
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
							<span className="inline-block h-2 w-8 rounded-full bg-gray-400" />
							<span className="inline-block h-2 w-8 rounded-full bg-gray-200" />
							<span className="inline-block h-2 w-8 rounded-full bg-gray-200" />
							<span className="ml-1">Step 1 of 3</span>
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
					<button className="text-sm text-[#62605C] flex items-center gap-1" onClick={() => router.push("/")}> 
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
				</div>


				{/* Body */}
				<div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_400px] gap-0 md:gap-8 p-6 md:p-8 md:items-start">
					{/* Left */}
					<div className="order-2 md:order-1 self-start">
						<h2 className="text-[30px] md:text-[32px] font-semibold text-[#41403D] leading-tight">We built this to help you land the job, this makes it a little easier.</h2>
						<p className="mt-2 text-[20px] font-bold text-[#62605C] hidden md:block">We’ve been there and we’re here to help you.</p>

						{/* Offer card */}
						<div className="mt-4 rounded-xl border border-[#C9B6FF] bg-[#EBE1FE]">
							<div className="px-6 pt-6 pb-2">
								<p className="text-[20px] font-semibold text-[#1f2937] text-center">Here’s <span className="underline font-bold">50% off</span> until you find a job.</p>
								<div className="mt-2 flex items-baseline justify-center gap-3 text-center">
									<p className="text-[20px] font-bold text-[#6E59F9]">{priceCurrent}<span className="text-[14px] font-medium">/month</span></p>
									<p className="text-[14px] line-through text-[#6b7280]">{priceStrikethrough}</p>
								</div>
							</div>
							<div className="px-6 pb-4">
								<button onClick={() => router.push("/still-looking/confirm")} className="w-full h-[40px] rounded-md bg-[#4ABF71] text-white font-semibold">Get 50% off</button>
								<p className="mt-2 text-center text-[12px] text-[#6b7280]">You won’t be charged until your next billing date.</p>
							</div>
						</div>

						<div className="border-t border-gray-200 mt-4 pt-4">
							<button onClick={() => router.push("/still-looking/usage")} className="w-full h-[47px] rounded-lg border-2 border-gray-300 text-[#62605C] font-semibold bg-white">No thanks</button>
						</div>
					</div>

					{/* Right: image (desktop only) */}
					<div className="order-1 md:order-2 hidden md:flex md:justify-end md:items-start self-start">
						<div className="relative w-[400px] h-[335px]">
							<img src="/VN.png" alt="City image" />
							<button onClick={() => router.back()} className="absolute bottom-0 right-0 mb-2 mr-2 h-7 w-7 flex items-center justify-center text-[#62605C]" aria-label="Close">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 