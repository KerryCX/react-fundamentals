import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "./useFetch";

describe("useFetch", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, value: 100 }],
    });
  });

  it("should return loading state initially", () => {
    const { result } = renderHook(() => useFetch("/api/metrics"));
    expect(result.current.loading).toBe(true);
  });

  it("should return data on successful fetch", async () => {
    const { result } = renderHook(() => useFetch("/api/metrics"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual([{ id: 1, value: 100 }]);
  });

  it("should return error when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useFetch("/api/metrics"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error?.message).toBe("Network error");
  });

  it("should handle empty data response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    const { result } = renderHook(() => useFetch("/api/metrics"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual([]);
  });

  it("should return error when response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });
    const { result } = renderHook(() => useFetch("/api/metrics"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error?.message).toBe("API error: 404");
  });
});
