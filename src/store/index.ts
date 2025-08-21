import { configureStore, type ReducersMapObject } from "@reduxjs/toolkit";
import foundJobReducer from "./foundJobSlice";
import cancelFlowReducer from "./cancelFlowSlice";

// Simple cookie helpers
const COOKIE_KEY = "hasFoundJob";
const STEP1_COOKIE_KEY = "cancelStep1";
const STEP2_COOKIE_KEY = "cancelStep2";
const STEP3_COOKIE_KEY = "cancelStep3";

const setCookie = (key: string, value: string, days = 30) => {
	if (typeof document === "undefined") return;
	const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
	document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

// Cookie persistence middleware
import type { Middleware } from "@reduxjs/toolkit";

export type RootState = {
	foundJob: ReturnType<typeof foundJobReducer>;
	cancelFlow: ReturnType<typeof cancelFlowReducer>;
};

export const rootReducer: ReducersMapObject<RootState> = {
	foundJob: foundJobReducer,
	cancelFlow: cancelFlowReducer,
};

const cookieMiddleware: Middleware<unknown, RootState> = (storeApi) => (next) => (action) => {
	const result = next(action);
	const type = (action as { type?: string }).type;
	if (type === "foundJob/setHasFoundJob") {
		const payload = (action as { payload?: unknown }).payload as unknown;
		setCookie(COOKIE_KEY, String(payload));
	}
	if (
		type === "cancelFlow/setJobFoundViaMigrateMate" ||
		type === "cancelFlow/setRolesAppliedViaMigrateMate" ||
		type === "cancelFlow/setCompaniesEmailedDirectly" ||
		type === "cancelFlow/setCompaniesInterviewed"
	) {
		const state = storeApi.getState();
		setCookie(STEP1_COOKIE_KEY, JSON.stringify(state.cancelFlow.step1));
	}
	if (type === "cancelFlow/setStep2Feedback") {
		const state = storeApi.getState();
		setCookie(STEP2_COOKIE_KEY, state.cancelFlow.step2Feedback ?? "");
	}
	if (type === "cancelFlow/setStep3VisaLawyerProvided") {
		const state = storeApi.getState();
		setCookie(STEP3_COOKIE_KEY, String(state.cancelFlow.step3VisaLawyerProvided ?? ""));
	}
	return result;
};

export const makeStore = (preloadedState?: Partial<RootState>) => {
	const store = configureStore({
		reducer: rootReducer,
		preloadedState: preloadedState as RootState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(cookieMiddleware),
	});
	return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<AppStore["dispatch"]>; 