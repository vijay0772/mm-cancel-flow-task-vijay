"use client";


import { useEffect } from "react";

type CancelModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onPrimary?: () => void; // Yes, I've found a job
  onSecondary?: () => void; // Not yet – I'm still looking
};

export function CancelModal({ isOpen, onClose, onPrimary, onSecondary }: CancelModalProps) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
        {/* Header bar */}
        <div className="relative px-6 py-4 border-b border-gray-200">
          <p className="text-[14px] font-bold text-[#62605C] text-center">Subscription Cancellation</p>
          <button aria-label="Close" onClick={onClose} className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-[#62605C] hover:text-[#62605C]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 p-6 md:p-8">
          {/* Left: copy + actions */}
          <div className="order-2 md:order-1">
            <div className="space-y-5 mt-0">
              <div className="space-y-0">
                <h2 className="text-[26px] md:text-[36px] font-semibold text-[#62605C] leading-tight ">Hey mate,</h2>
                <h2 className="text-[22px] md:text-[36px] font-semibold text-[#62605C] leading-tight">Quick one before you go.</h2>
              </div>
              <p className="text-[24px] md:text-[28px] italic font-bold text-[#62605C] leading-tight">
                Have you found a job yet?
              </p>
              <p className="text-[12px] font-bold md:text-[16px] text-[#62605C] leading-relaxed">
                Whatever your answer, we just want to help you take the next step. With visa support, or by hearing how we can do better.
              </p>
            </div>

            <div className="mt-2 space-y-4">
              <div className="border-t border-gray-200 pt-5">
                <button
                  onClick={onPrimary}
                  className="w-full h-10 md:h-11 font-bold rounded-[8px] border-[2.5px] border-[#E5E5E5] bg-white px-6 text-[15px] text-[#62605C] hover:border-[#DADADA] hover:bg-gray-50 transition-colors"
                >
                  Yes, I&apos;ve found a job
                </button>
                <button
                  onClick={onSecondary}
                  className="w-full h-10 md:h-11 font-bold rounded-[8px] border-[2.5px] border-[#E5E5E5] bg-white px-6 text-[15px] text-[#62605C] hover:border-[#DADADA] hover:bg-gray-50 transition-colors mt-6"
                >
                  Not yet – I&apos;m still looking
                </button>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="order-1 md:order-2 flex items-start">
            <img src="/rounded_image (1).png" alt="NYC" className="w-full h-[200px] rounded-[12px] object-cover md:w-auto md:h-auto md:rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
} 