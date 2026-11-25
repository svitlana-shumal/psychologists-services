import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getPsychologists: vi.fn(),
}));

vi.mock("../services/psychologists", () => ({
  getPsychologists: mocks.getPsychologists,
}));
vi.mock("../components/PsychologistCard/page", () => ({
  default: ({ data }: { data: { id: string; name: string } }) => (
    <div data-testid={`card-${data.id}`}>{data.name}</div>
  ),
}));
vi.mock("../components/Filters/page", () => ({
  default: () => null,
}));

import PsychologistsPage from "./page";

function pageOf(...ids: string[]) {
  return ids.map((id) => ({
    id,
    name: `Name ${id}`,
    avatar_url: "",
    experience: "",
    reviews: [],
    price_per_hour: 1,
    rating: 1,
    license: "",
    specialization: "",
    initial_consultation: "",
    about: "",
  }));
}

describe("PsychologistsPage", () => {
  beforeEach(() => {
    mocks.getPsychologists.mockReset();
  });

  it("loads three psychologists first and appends the next page", async () => {
    mocks.getPsychologists
      .mockResolvedValueOnce(pageOf("1", "2", "3"))
      .mockResolvedValueOnce(pageOf("4"));

    render(<PsychologistsPage />);

    await waitFor(() => {
      expect(screen.getByTestId("card-1")).toBeInTheDocument();
      expect(screen.getByTestId("card-2")).toBeInTheDocument();
      expect(screen.getByTestId("card-3")).toBeInTheDocument();
    });
    expect(mocks.getPsychologists).toHaveBeenNthCalledWith(1, null);

    fireEvent.click(screen.getByRole("button", { name: "Load more" }));
    await waitFor(() =>
      expect(screen.getByTestId("card-4")).toBeInTheDocument()
    );
    expect(mocks.getPsychologists).toHaveBeenNthCalledWith(2, "3");
  });
});
