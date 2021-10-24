import { configureStore } from "@reduxjs/toolkit";

// API Slices
import { dashboardApi } from "@api/services/DashboardService";

export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
