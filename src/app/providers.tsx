"use client";

import { Provider } from "react-redux";
import { makeStore, type RootState } from "../store";
import { ReactNode, useMemo } from "react";
import type { Step1Answers } from "../store/cancelFlowSlice";

function getCookie(key: string): string | null {
	if (typeof document === "undefined") return null;
	const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
	return match ? decodeURIComponent(match[2]) : null;
}

type Preloaded = Partial<RootState>

type CancelFlowPartial = Partial<RootState["cancelFlow"]>

export default function Providers({ children, initialState }: { children: ReactNode; initialState?: Preloaded }) {
	const store = useMemo(() => {
		if (initialState) return makeStore(initialState);
		// Build preloaded state from cookies on the client only (fallback)
		const hasFoundJob = getCookie("hasFoundJob");
		let step1: Step1Answers | null = null;
		const step1Raw = getCookie("cancelStep1");
		if (step1Raw) {
			try { step1 = JSON.parse(step1Raw) as Step1Answers; } catch {}
		}
		const preloaded: Preloaded = {};
		if (hasFoundJob != null) preloaded.foundJob = { hasFoundJob: hasFoundJob === "true" };
		if (step1) {
			const cf: CancelFlowPartial = { step1 };
			preloaded.cancelFlow = cf as RootState["cancelFlow"];
		}
		return makeStore(preloaded);
	}, [initialState]);
	return <Provider store={store}>{children}</Provider>;
} 