"use client";


import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
	setJobFoundViaMigrateMate,
	setRolesAppliedViaMigrateMate,
	setCompaniesEmailedDirectly,
	setCompaniesInterviewed,
} from "../../store/cancelFlowSlice";
import type { RootState } from "../../store";
import { setHasFoundJob } from "../../store/foundJobSlice";
import { startCancellation } from "@/lib/cancelApi";

const Option = ({ selected, children, onClick, size = "md" }: { selected: boolean; children: React.ReactNode; onClick: () => void; size?: "xs" | "sm" | "md" }) => (
	<button
		onClick={onClick}
		className={`w-full ${
			size === "xs"
				? "h-[30px] px-3 text-[13px]"
				: size === "sm"
				? "h-8 md:h-9 px-3 text-[13px]"
				: "h-9 md:h-10 px-4 text-[14px]"
		} rounded-md border font-medium transition-colors ${
			selected
				? "bg-[#9A6FFF] border-[#c9b6ff] text-[#ffffff]"
				: "bg-gray-100 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-200"
		}`}
	>
		{children}
	</button>
);

export default function FoundJobPage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const step1 = useSelector((s: RootState) => s.cancelFlow.step1);

	useEffect(() => {
		// Initialize cancellation + A/B assignment
		startCancellation();
	}, []);

	const canContinue =
		step1.jobFoundViaMigrateMate !== null &&
		step1.rolesAppliedViaMigrateMate !== null &&
		step1.companiesEmailedDirectly !== null &&
		step1.companiesInterviewed !== null;

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-start md:items-center overflow-y-auto">
			<div className="absolute inset-0 bg-black/40" />
			<div className="relative mx-4 my-6 md:my-8 w-full max-w-[1000px] rounded-[20px] bg-white border border-gray-200 shadow-[0_12px_32px_rgba(0,0,0,0.15)] md:max-h-[90vh]">
				{/* Header - desktop */}
				<div className="relative px-6 py-4 border-b border-gray-200 hidden md:block">
					<button
						className="absolute left-6 top-1/2 -translate-y-1/2 text-sm text-gray-700 flex items-center gap-1"
						onClick={() => router.push("/")}
					>
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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 px-6 pt-3 pb-6 md:p-8">
					{/* Left: content */}
					<div className="order-2 md:order-1 ">
						<h2 className="text-[32px] md:text-[26px] font-semibold text-[#41403D] leading-tight flex items-center gap-2">
							<span>Congrats on the new role!🎉</span>						</h2>
						<div className="mt-2 h-px w-full bg-gray-200 md:hidden" />

						<div className="mt-5 space-y-7.5">
							<div>
								<p className="text-[14px] font-bold md:text-[16px] text-[#62605C]">Did you find this job with MigrateMate?*</p>
								<div className="grid grid-cols-2 gap-4 mt-3">
									<Option size="xs" selected={step1.jobFoundViaMigrateMate === "yes"} onClick={() => dispatch(setJobFoundViaMigrateMate("yes"))}>Yes</Option>
									<Option size="xs" selected={step1.jobFoundViaMigrateMate === "no"} onClick={() => dispatch(setJobFoundViaMigrateMate("no"))}>No</Option>
								</div>
							</div>

							<div>
								<p className="text-[14px] font-bold md:text-[16px] text-[#62605C]">How many roles did you <span className="underline decoration-2 underline-offset-4">apply</span> for through Migrate Mate?*</p>
								<div className="grid grid-cols-4 gap-4 mt-3">
									{(["0", "1-5", "6-20", "20+"] as const).map((v) => (
										<Option size="xs" key={v} selected={step1.rolesAppliedViaMigrateMate === v} onClick={() => dispatch(setRolesAppliedViaMigrateMate(v))}>{v}</Option>
									))}
								</div>
							</div>

							<div>
								<p className="text-[14px] font-bold md:text-[16px] text-[#62605C]">How many companies did you <span className="underline decoration-2 underline-offset-2">email</span> directly?*</p>
								<div className="grid grid-cols-4 gap-4 mt-3">
									{(["0", "1-5", "6-20", "20+"] as const).map((v) => (
										<Option size="xs" key={v} selected={step1.companiesEmailedDirectly === v} onClick={() => dispatch(setCompaniesEmailedDirectly(v))}>{v}</Option>
									))}
								</div>
							</div>

							<div>
								<p className="text-[14px] font-bold md:text-[16px] text-[#62605C]">How many different companies did you <span className="underline decoration-2 underline-offset-2">interview</span> with?*</p>
								<div className="grid grid-cols-4 gap-4 mt-3">
									{(["0", "1-2", "3-5", "5+"] as const).map((v) => (
										<Option size="xs" key={v} selected={step1.companiesInterviewed === v} onClick={() => dispatch(setCompaniesInterviewed(v))}>{v}</Option>
									))}
								</div>
							</div>

							<div className="border-t border-gray-200 pt-5 mt-1">
								<button
									disabled={!canContinue}
									onClick={() => {
										dispatch(setHasFoundJob(true));
										// Step 1 complete → go to Step 2
										router.push("/found-job/step2");
									}}
									className={`w-full h-[40px] rounded-md px-4 text-[13px] font-medium transition-colors ${
										canContinue ? "bg-[#8952fc] text-white hover:bg-[#7b40fc]" : "bg-gray-100 text-gray-400 cursor-not-allowed"
									}`}
								>
									Continue
								</button>
							</div>
						</div>
					</div>

					{/* Right: image (desktop only) */}
					<div className="order-1 md:order-2 items-start hidden md:flex">
									<img src="/congrats.png" alt="Congrats" />
					</div>
				</div>
			</div>
		</div>
	);
} 