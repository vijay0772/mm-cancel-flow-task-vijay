"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "../../../store";
import { setStep3VisaLawyerProvided } from "../../../store/cancelFlowSlice";

export default function MMNoPage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const answer = useSelector((s: RootState) => s.cancelFlow.step3VisaLawyerProvided);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative mx-4 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
				{/* Header - desktop */}
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
		
				 {/* Header - mobile (progress below title) */}
				 <div className="relative px-4 py-3 border-b border-gray-200 md:hidden">
          <div className="flex flex-col items-left gap-2">
            <p className="text-[16px] font-bold text-[#62605C]">
              Subscription Cancellation
            </p>

            {/* progress row */}
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
				<div className="px-4 py-3  md:hidden">
					<button className="text-sm text-[#62605C] flex items-center gap-1" onClick={() => router.back()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</button>
				</div>


				{/* Body */}
				<div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_400px] gap-0 md:gap-8 p-6 md:p-8 md:items-start">
					<div className="order-2 md:order-1">
					<h2 className="text-[36px] md:text-[32px] font-semibold text-[#41403D]  leading-none mt-2">You landed the job!</h2>
					<p className="mt-0 text-[36px] italic font-bold text-[#41403D] leading-none mt-2">That’s what we live for.</p>
						<p className="mt-3 text-[16px] font-bold md:text-[16px] text-[#41403D] leading-tight">
							Even if it wasn’t through Migrate Mate,<br className="hidden md:block" />
							let us help get your visa sorted.
						</p>
						<div className="mt-2 h-px w-full bg-gray-200 md:hidden" />

						<p className="mt-6 text-[14px] text-[#62605C]">Is your company providing an immigration lawyer to help with your visa?</p>

						<div className="mt-3 space-y-3">
							<label className="flex items-center gap-3 cursor-pointer select-none" onClick={() => dispatch(setStep3VisaLawyerProvided("yes"))}>
								<input type="radio" name="visa" className="sr-only" checked={answer === "yes"} readOnly />
								<span className={`w-5 h-5 rounded-full flex items-center justify-center ${answer === "yes" ? "bg-[#41403D]" : "border-2 border-[#41403D]"}`}>
									<span className={`w-2.5 h-2.5 rounded-full ${answer === "yes" ? "bg-white" : "bg-transparent"}`} />
								</span>
								<span className="text-[14px] text-[#41403D]">Yes</span>
							</label>
							<label className="flex items-center gap-3 cursor-pointer select-none" onClick={() => dispatch(setStep3VisaLawyerProvided("no"))}>
								<input type="radio" name="visa" className="sr-only" checked={answer === "no"} readOnly />
								<span className={`w-5 h-5 rounded-full flex items-center justify-center ${answer === "no" ? "bg-[#41403D]" : "border-2 border-[#41403D]"}`}>
									<span className={`w-2.5 h-2.5 rounded-full ${answer === "no" ? "bg-white" : "bg-transparent"}`} />
								</span>
								<span className="text-[14px] text-[#41403D]">No</span>
							</label>
						</div>

						<div className="border-t border-gray-200 pt-4 mt-6">
							<button
								disabled={answer == null}
																	onClick={() => {
										if (answer === "no") {
											router.push("/found-job/mm-no/no");
										} else if (answer === "yes") {
											router.push("/found-job/mm-no/yes");
										}
									}}
								className={`w-full h-[32px] rounded-md px-3 text-[12px] font-medium transition-colors ${
									answer ? "bg-[#8952fc] text-white hover:bg-[#7b40fc]" : "bg-gray-100 text-gray-400 cursor-not-allowed"
								}`}
							>
								Complete cancellation
							</button>
						</div>
					</div>

					{/* Right: image (desktop only) */}
					<div className="order-1 md:order-2 hidden md:flex md:justify-end md:items-start">
						<div className="relative w-[400px] h-[335px] rounded-[12px] overflow-hidden bg-transparent ring-0 outline-none shadow-none drop-shadow-none border-0 select-none">
						<img src="/ON.png" alt="City image" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 