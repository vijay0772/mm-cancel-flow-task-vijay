export type CancellationState = {
  hasFoundJob: boolean;
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CancellationState = {
  hasFoundJob: false,
};

const foundJobSlice = createSlice({
  name: "foundJob",
  initialState,
  reducers: {
    setHasFoundJob(state, action: PayloadAction<boolean>) {
      state.hasFoundJob = action.payload;
    },
  },
});

export const { setHasFoundJob } = foundJobSlice.actions;
export default foundJobSlice.reducer; 