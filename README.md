# React Fundamentals

A React TypeScript practice repository covering core frontend patterns.

## useFetch Hook

A generic, reusable data fetching hook with full async state handling.

Covers:

- Loading, error, success and empty data states
- TypeScript generics for typed API responses
- Proper HTTP error handling via `response.ok`

## Redux Toolkit Query

The same data source (JSONPlaceholder posts) fetched a second way, via an RTK Query API slice instead of the custom hook above, shown side by side on the same page for comparison.

Covers:

- `createApi`/`fetchBaseQuery` for a typed, cache-aware data layer
- Store setup with `configureStore`, including RTK Query's generated reducer and middleware
- A generated query hook (`useGetMetricsQuery`) replacing manual loading/error state management

## Tests

Tests cover:

- Initial loading state
- Successful fetch with data
- Successful fetch with empty data
- Network errors
- HTTP error responses (e.g. 404)

## Installation

```bash
npm install
```

## Running Tests

```bash
npm test
```
