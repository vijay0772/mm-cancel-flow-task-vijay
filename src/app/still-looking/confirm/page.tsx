"use client";

import { useRouter } from "next/navigation";
import { finalizeCancellation } from "@/lib/cancelApi";

export default function StillLookingConfirmPage() {
	const router = useRouter();

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-start md:items-center overflow-y-auto">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative mx-4 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
				{/* Desktop header */}
				<div className="relative px-6 py-4 border-b border-gray-200 hidden md:block">
					<div className="flex items-center justify-center">
						<p className="text-[14px] font-bold text-[#62605C]">Subscription</p>
					</div>
					<button aria-label="Close" onClick={() => router.back()} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#62605C]">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Header - mobile (title + close) */}
				<div className="relative px-4 py-3 border-b border-gray-200 md:hidden">
					<p className="text-[16px] font-bold text-[#62605C]">Subscription Continued</p>
					<button aria-label="Close" onClick={() => router.back()} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62605C]">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Mobile image */}
				<div className="px-4 pt-4 md:hidden">
					<img src="/VN2.png" alt="City image" />
				</div>

				{/* Body */}
				<div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_400px] gap-0 md:gap-8 p-6 md:p-8 md:items-start">
					{/* Left */}
					<div className="order-2 md:order-1">
						<h2 className="text-[25px] md:text-[32px] font-semibold text-[#41403D] leading-tight">Great choice, mate!</h2>
						<h3 className="mt-4 text-[25px] md:text-[28px] font-semibold text-[#1f2937] leading-snug">You’re still on the path to your dream role. <span className="text-[#9A6FFF]">Let’s make it happen together!</span></h3>

						<p className="mt-6 text-[14px] font-bold text-[#62605C]">You’ve got XX days left on your current plan.<br/>Starting from XX date, your monthly payment will be <span className="font-semibold">$12.50</span>.</p>
						<p className="mt-2 text-[12px] text-[#62605C] md:mb-0 mb-0"><em>You can cancel anytime before then.</em></p>

						<div className="border-t border-gray-200 pt-4 mt-4 md:mt-6">
							<button onClick={async () => { await finalizeCancellation({ reason: null, accepted: true }); router.push("/"); }} className="w-full h-[44px] rounded-lg bg-[#9A6FFF] text-white font-semibold">Land your dream role</button>
						</div>
					</div>

					{/* Right image */}
					<div className="order-1 md:order-2 hidden md:flex md:justify-end md:items-start">
						<div className="relative w-[400px] h-[335px]">
							<img src="/VN2.png" alt="City image" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 