import { beforeEach, describe, expect, it, vi } from "vitest";

const database = vi.hoisted(() => ({
  get: vi.fn(),
  limitToFirst: vi.fn(() => "limit"),
  orderByKey: vi.fn(() => "order"),
  query: vi.fn((...args: unknown[]) => args),
  ref: vi.fn((_db: unknown, path: string) => path),
  startAfter: vi.fn((key: string) => key),
}));

vi.mock("firebase/database", () => database);
vi.mock("../firebaseDatabase", () => ({ db: {} }));

import { getPsychologists } from "./psychologists";

function psychologist(name: string) {
  return {
    name,
    avatar_url: `${name}.jpg`,
    experience: "5 years",
    reviews: [],
    price_per_hour: 50,
    rating: 4.8,
    license: "License",
    specialization: "Anxiety",
    initial_consultation: "Free",
    about: "About",
  };
}

function snapshot(value: unknown) {
  return {
    exists: () => value !== null,
    val: () => value,
  };
}

describe("getPsychologists", () => {
  beforeEach(() => {
    database.get.mockReset();
  });

  it("skips non-psychologist root nodes and continues until it has a full page", async () => {
    database.get
      .mockResolvedValueOnce(
        snapshot({
          favorites: { user1: { "psych-1": true } },
          "psych-1": psychologist("Anna"),
          "psych-2": psychologist("Bohdan"),
        })
      )
      .mockResolvedValueOnce(
        snapshot({
          "psych-3": psychologist("Chris"),
          "psych-4": psychologist("Dana"),
        })
      );

    const result = await getPsychologists(null);

    expect(result.map(({ id }) => id)).toEqual([
      "psych-1",
      "psych-2",
      "psych-3",
    ]);
    expect(database.get).toHaveBeenCalledTimes(2);
    expect(database.startAfter).toHaveBeenCalledWith("psych-2");
  });
});
