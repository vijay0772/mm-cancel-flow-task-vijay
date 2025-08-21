"use client";

import { useRouter } from "next/navigation";

export default function CancellationCompletePage() {
	const router = useRouter();

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative mx-4 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
				{/* Header - desktop */}
				<div className="relative px-6 py-4 border-b border-gray-200 hidden md:block">
					<div className="flex items-center justify-center gap-3">
						<p className="text-[14px] font-bold text-gray-800">Subscription Cancelled</p>
						<div className="flex items-center gap-2 text-xs text-gray-600">
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
							<span className="ml-1">Completed</span>
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

				 {/* Header - mobile (progress below title) */}
				 <div className="relative px-4 py-3 border-b border-gray-200 md:hidden">
          <div className="flex flex-col items-left gap-2">
            <p className="text-[16px] font-bold text-[#62605C]">
              Subscription Cancelled
            </p>

            {/* progress row */}
            <div className="flex items-left gap-2 text-[12px] leading-none text-[#62605C]">
              <span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
              <span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
              <span className="inline-block h-2 w-8 rounded-full bg-[#4ABF71]" />
              <span className="ml-1">Completed</span>
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

				{/* Body */}
				<div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_400px] gap-0 md:gap-8 p-6 md:p-8 md:items-start">
					{/* Left */}
					<div className="order-2 md:order-1">
						<h2 className="text-[32px] md:text-[30px] font-semibold text-gray-900 leading-tight">Your cancellation’s all sorted, mate,no more charges.</h2>

						<div className="mt-4 rounded-lg border border-gray-200 bg-[#F6F6F6] p-4">
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 rounded-full overflow-hidden">
								<img src="/mate.png" alt="City image" />
								</div>
								<div>
									<p className="text-[13px] font-semibold text-gray-900">Mihailo Bozic</p>
									<p className="text-[12px] text-[#62605C]">&lt;mihailo@migratemate.co&gt;</p>
								</div>
							</div>
							<div className="mt-3 ml-11 text-[14px] text-gray-800">
								<p className="font-semibold">I’ll be reaching out soon to help with the visa side of things.</p>
								<p className="mt-3">We’ve got your back, whether it’s questions, paperwork, or just figuring out your options.</p>
								<p className="mt-3">Keep an eye on your inbox, I’ll be in touch <span className="underline">shortly</span>.</p>
							</div>
						</div>

						<div className="border-t border-gray-200 pt-4 mt-6">
							<button
								onClick={() => router.push("/")}
								className="w-full h-[40px] rounded-md px-4 text-[14px] font-medium transition-colors bg-[#8952fc] text-white hover:bg-[#7b40fc]"
							>
								Finish
							</button>
						</div>
					</div>

					{/* Right: image (desktop only) */}
					<div className="order-1 md:order-2 hidden md:flex md:justify-end md:items-start">
					<div className="relative w-[400px] h-[335px]">
						<img src="/ON4.png" alt="City image" />
					</div>
					</div>
				</div>
			</div>
		</div>
	);
} 