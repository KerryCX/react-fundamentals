/**
 * RTK Query API slice.
 *
 * createApi generates a typed data layer from an endpoint definition. fetchBaseQuery
 * handles the request itself, and the React hook (useGetMetricsQuery) is generated
 * automatically from the endpoint name, so it never gets written by hand.
 *
 * The difference from the useFetch hook in src/hooks: results are cached in the Redux
 * store keyed by endpoint plus arguments. Components sharing a query share one request,
 * and remounting reads from cache instead of refetching (60 seconds by default).
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Metric {
  id: number;
  title: string;
}

export const metricsApi = createApi({
  reducerPath: "metricsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    // <Metric[], void>: returns an array of Metric, takes no argument.
    getMetrics: builder.query<Metric[], void>({
      query: () => "/posts",
    }),
  }),
});

// Generated from the endpoint name above: getMetrics -> useGetMetricsQuery.
export const { useGetMetricsQuery } = metricsApi;
