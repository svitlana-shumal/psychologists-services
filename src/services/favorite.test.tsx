import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Psychologists } from "../types/PsychologistsType";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  getPsychologistById: vi.fn(),
  ref: vi.fn((_db: unknown, path: string) => path),
  remove: vi.fn(),
  set: vi.fn(),
  user: { uid: "user-1" },
}));

vi.mock("firebase/database", () => ({
  get: mocks.get,
  ref: mocks.ref,
  remove: mocks.remove,
  set: mocks.set,
}));
vi.mock("../firebaseDatabase", () => ({ db: {} }));
vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: mocks.user }),
}));
vi.mock("./psychologists", () => ({
  getPsychologistById: mocks.getPsychologistById,
}));

import { useFavorites } from "./favorite";

function snapshot(value: unknown) {
  return {
    exists: () => value !== null,
    val: () => value,
  };
}

describe("useFavorites", () => {
  beforeEach(() => {
    mocks.get.mockReset();
    mocks.getPsychologistById.mockReset();
    mocks.remove.mockReset();
    mocks.set.mockReset();
  });

  it("restores saved favorites and updates state after add/remove", async () => {
    const psychologist: Psychologists = {
      id: "psych-1",
      name: "Dr. Example",
      avatar_url: "",
      experience: "",
      reviews: [],
      price_per_hour: 1,
      rating: 1,
      license: "",
      specialization: "",
      initial_consultation: "",
      about: "",
    };
    mocks.get.mockResolvedValueOnce(snapshot({ "psych-1": true }));
    mocks.getPsychologistById.mockResolvedValueOnce(psychologist);
    mocks.remove.mockResolvedValueOnce(undefined);
    mocks.set.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.favorites).toEqual([psychologist]);

    await act(async () => {
      await result.current.removeFavorite("psych-1");
    });
    expect(mocks.remove).toHaveBeenCalledWith(
      "favorites/user-1/psych-1"
    );
    expect(result.current.favorites).toEqual([]);

    await act(async () => {
      await result.current.addFavorite(psychologist);
    });
    expect(mocks.set).toHaveBeenCalledWith(
      "favorites/user-1/psych-1",
      true
    );
    expect(result.current.favorites).toEqual([psychologist]);
  });

  it("exposes load errors and supports retrying", async () => {
    mocks.get
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(snapshot(null));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.error).toBe(true));

    act(() => result.current.retry());
    await waitFor(() => {
      expect(result.current.error).toBe(false);
      expect(result.current.loading).toBe(false);
    });
  });
});
