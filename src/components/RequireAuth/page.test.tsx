import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  useAuth: vi.fn(),
}));

vi.mock("../../hooks/useAuth", () => ({
  useAuth: mocks.useAuth,
}));

import RequireAuth from "./page";

function renderFavoritesRoute() {
  return render(
    <MemoryRouter initialEntries={["/favorites"]}>
      <Routes>
        <Route
          path="/favorites"
          element={
            <RequireAuth>
              <p>Private favorites</p>
            </RequireAuth>
          }
        />
        <Route path="/psychologists" element={<p>Psychologists</p>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("RequireAuth", () => {
  beforeEach(() => {
    mocks.useAuth.mockReset();
  });

  it("redirects unauthenticated users away from favorites", () => {
    mocks.useAuth.mockReturnValue({ user: null, authReady: true });

    renderFavoritesRoute();

    expect(screen.getByText("Psychologists")).toBeInTheDocument();
    expect(screen.queryByText("Private favorites")).not.toBeInTheDocument();
  });

  it("renders favorites for an authenticated user", () => {
    mocks.useAuth.mockReturnValue({
      user: { uid: "user-1" },
      authReady: true,
    });

    renderFavoritesRoute();

    expect(screen.getByText("Private favorites")).toBeInTheDocument();
  });
});
