"use client";

import { useRouter } from "next/navigation";

export default function StillLookingCompletedPage() {
	const router = useRouter();
	return (
		<div className="fixed inset-0 z-50 flex justify-center items-start md:items-center overflow-y-auto">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative mx-4 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
				{/* Header */}
				<div className="relative px-6 py-4 border-b border-gray-200 hidden md:block">
					<button className="absolute left-6 top-1/2 -translate-y-1/2 text-sm text-[#62605C] flex items-center gap-1" onClick={() => router.back()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
					<div className="flex items-center justify-center gap-3">
						<p className="text-[14px] font-bold text-[#62605C]">Subscription Cancelled</p>
						<div className="flex items-center gap-2 text-xs text-[#62605C]">
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="ml-1">Completed</span>
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
						<p className="text-[16px] font-bold text-[#62605C]">Subscription Cancelled</p>
						<div className="flex items-center gap-2 text-[12px] leading-none text-[#62605C]">
							<span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
							<span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
							<span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
							<span className="ml-1">Completed</span>
						</div>
					</div>
					<button aria-label="Close" onClick={() => router.back()} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62605C] md:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Mobile image */}
				<div className="px-4 pt-4 md:hidden">
					<img src="/VN7.png" alt="City image" />
				</div>

				{/* Body */}
				<div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_400px] gap-0 md:gap-8 p-6 md:p-8 md:items-stretch">
					{/* Left */}
					<div className="order-2 md:order-1 self-start">
						<h2 className="text-[32px] font-semibold text-[#172242] leading-tight">Sorry to see you go, mate.</h2>
						<h3 className="mt-2 text-[26px] font-semibold text-[#172242] leading-snug">Thanks for being with us, and you’re always welcome back.</h3>
						<p className="mt-4 text-[14px] font-bold text-[#62605C]">Your subscription is set to end on XX date.</p>
						<p className="text-[14px] font-bold text-[#62605C]">You’ll still have full access until then. No further charges after that.</p>
						<p className="mt-4 text-[14px]  text-[#62605C]">Changed your mind? You can reactivate anytime before your end date.</p>
						<div className="border-t border-gray-200 pt-4 mt-6">
							<button onClick={() => router.push("/")} className="w-full h-[44px] rounded-lg bg-[#7C6CF3] text-white font-semibold">Back to Jobs</button>
						</div>
					</div>

					{/* Right image */}
					<div className="order-1 md:order-2 hidden md:flex md:flex-col md:justify-between md:items-end self-stretch">
						<img src="/VN7.png" alt="City image" className="w-[400px] h-auto" />
					</div>
				</div>
			</div>
		</div>
	);
} 