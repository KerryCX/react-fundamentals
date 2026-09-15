/**
 * Redux store.
 *
 * RTK Query needs two things registered here: its generated reducer, which holds the
 * cached data, and its middleware, which drives the request lifecycle (fetching,
 * caching, invalidation, polling). Leaving the middleware out fails quietly rather
 * than loudly, so it is an easy one to miss.
 *
 * RootState and AppDispatch are inferred from the store rather than written by hand,
 * so they stay accurate as more slices are added.
 */
import { configureStore } from "@reduxjs/toolkit";
import { metricsApi } from "../features/metrics/metricsApi";

export const store = configureStore({
  reducer: {
    [metricsApi.reducerPath]: metricsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(metricsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
