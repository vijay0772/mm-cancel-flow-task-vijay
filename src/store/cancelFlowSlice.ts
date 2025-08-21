import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Step1Answers = {
  jobFoundViaMigrateMate: "yes" | "no" | null;
  rolesAppliedViaMigrateMate: "0" | "1-5" | "6-20" | "20+" | null;
  companiesEmailedDirectly: "0" | "1-5" | "6-20" | "20+" | null;
  companiesInterviewed: "0" | "1-2" | "3-5" | "5+" | null;
};

export type CancelFlowState = {
  step1: Step1Answers;
  step2Feedback: string;
  step3VisaLawyerProvided: "yes" | "no" | null;
};

const initialState: CancelFlowState = {
  step1: {
    jobFoundViaMigrateMate: null,
    rolesAppliedViaMigrateMate: null,
    companiesEmailedDirectly: null,
    companiesInterviewed: null,
  },
  step2Feedback: "",
  step3VisaLawyerProvided: null,
};

const cancelFlowSlice = createSlice({
  name: "cancelFlow",
  initialState,
  reducers: {
    setJobFoundViaMigrateMate(state, action: PayloadAction<"yes" | "no">) {
      state.step1.jobFoundViaMigrateMate = action.payload;
    },
    setRolesAppliedViaMigrateMate(state, action: PayloadAction<"0" | "1-5" | "6-20" | "20+">) {
      state.step1.rolesAppliedViaMigrateMate = action.payload;
    },
    setCompaniesEmailedDirectly(state, action: PayloadAction<"0" | "1-5" | "6-20" | "20+">) {
      state.step1.companiesEmailedDirectly = action.payload;
    },
    setCompaniesInterviewed(state, action: PayloadAction<"0" | "1-2" | "3-5" | "5+">) {
      state.step1.companiesInterviewed = action.payload;
    },
    hydrateStep1(state, action: PayloadAction<Partial<Step1Answers>>) {
      state.step1 = { ...state.step1, ...action.payload };
    },
    resetStep1(state) {
      state.step1 = initialState.step1;
    },
    setStep2Feedback(state, action: PayloadAction<string>) {
      state.step2Feedback = action.payload;
    },
    hydrateStep2(state, action: PayloadAction<string>) {
      state.step2Feedback = action.payload;
    },
    setStep3VisaLawyerProvided(state, action: PayloadAction<"yes" | "no">) {
      state.step3VisaLawyerProvided = action.payload;
    },
  },
});

export const {
  setJobFoundViaMigrateMate,
  setRolesAppliedViaMigrateMate,
  setCompaniesEmailedDirectly,
  setCompaniesInterviewed,
  hydrateStep1,
  resetStep1,
  setStep2Feedback,
  hydrateStep2,
  setStep3VisaLawyerProvided,
} = cancelFlowSlice.actions;

export default cancelFlowSlice.reducer; 