import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { metricsApi } from "../features/metrics/metricsApi";
import MetricsQuery from "./MetricsQuery";

const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      [metricsApi.reducerPath]: metricsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(metricsApi.middleware),
  });
  return render(
    <Provider store={store}>
      <MetricsQuery />
    </Provider>,
  );
};

const jsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

describe("<MetricsQuery>", () => {
  beforeEach(() => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(jsonResponse([{ id: 1, title: 100 }]));
  });

  it("should return loading state initially", () => {
    renderWithStore();
    expect(screen.getByText("Loading data, please wait")).toBeInTheDocument();
  });

  it("should display error state correctly", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    renderWithStore();
    await waitFor(() => {
      expect(
        screen.getByText("Unable to load data. Please try again later."),
      ).toBeInTheDocument();
    });
  });

  it("should display empty state correctly", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse([]));
    renderWithStore();
    await waitFor(() => {
      expect(screen.getByText("There is no data")).toBeInTheDocument();
    });
  });

  it("should display data", async () => {
    renderWithStore();
    await waitFor(() => {
      expect(screen.getByText("Title: 100")).toBeInTheDocument();
    });
  });
});
