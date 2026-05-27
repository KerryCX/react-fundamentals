import { render, screen, waitFor } from "@testing-library/react";
import DataDisplay from "./DataDisplay";

describe("<DataDisplay>", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 100 }],
    });
  });

  it("should return loading state initially", () => {
    render(<DataDisplay url='/api/metrics' />);
    expect(screen.getByText("Loading data, please wait")).toBeInTheDocument();
  });

  it("should display error state correctly", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    render(<DataDisplay url='/api/metrics' />);
    await waitFor(() => {
      expect(
        screen.getByText("Unable to load data. Please try again later."),
      ).toBeInTheDocument();
    });
  });

  it("should display empty state correctly", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => [] });
    render(<DataDisplay url='/api/metrics' />);
    await waitFor(() => {
      expect(screen.getByText("There is no data")).toBeInTheDocument();
    });
  });

  it("should display data", async () => {
    render(<DataDisplay url='/api/metrics' />);
    await waitFor(() => {
      expect(screen.getByText("Title: 100")).toBeInTheDocument();
    });
  });
});
