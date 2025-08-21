"use client";

import { useRouter } from "next/navigation";

export default function CompleteYesPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative mx-4 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
        {/* Header - desktop */}
        <div className="relative px-6 py-4 border-b border-gray-200 hidden md:block">
          <div className="flex items-center justify-center gap-3">
            <p className="text-[14px] font-bold text-[#62605C]">Subscription Cancelled</p>
            <div className="flex items-center gap-2 text-xs text-[#62605C]">
              <span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
              <span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
              <span className="inline-block w-8 h-2 rounded-full bg-[#4ABF71]" />
              <span className="ml-1">Completed</span>
            </div>
          </div>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#62605C] hover:text-gray-800"
            onClick={() => router.push("/")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
        <div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_400px] gap-0 md:gap-6 p-6 md:p-6 pb-4 md:items-start">
          {/* Mobile image */}
          <div className="order-1 md:hidden mb-4">
            <img src="/OYF.png" alt="City image" />
          </div>
          {/* Left */}
          <div className="order-2 md:order-1">
            <h2 className="text-[30px] md:text-[32px] font-semibold text-[#111827] leading-snug">
              All done, your cancellation’s
              <br />
              been processed.
            </h2>
            <p className="mt-3 md:mt-4 text-[15px] md:text-[16px] font-bold text-[#41403D]">
              We’re stoked to hear you’ve landed a job and sorted your visa.
              <br />
              Big congrats from the team. 🙌
            </p>

            <div className="border-t border-gray-200 pt-3 mt-5">
              <button
                onClick={() => router.push("/")}
                className="w-full h-[38px] md:h-[40px] rounded-md px-4 text-[14px] font-medium transition-colors bg-[#8952fc] text-white hover:bg-[#7b40fc]"
              >
                Finish
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2 hidden md:flex md:justify-end md:items-start">
  <div className="relative w-[400px]">

            <img
                src="/OYF.png"
                alt="City image"
            />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
