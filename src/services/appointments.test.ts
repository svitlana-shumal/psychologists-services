import { describe, expect, it, vi } from "vitest";

const database = vi.hoisted(() => ({
  push: vi.fn(),
  ref: vi.fn((_db: unknown, path: string) => path),
}));

vi.mock("firebase/database", () => database);
vi.mock("../firebaseDatabase", () => ({ db: {} }));

import { createAppointmentRequest } from "./appointments";

describe("createAppointmentRequest", () => {
  it("writes the appointment and psychologist details to Firebase", async () => {
    database.push.mockResolvedValueOnce(undefined);
    vi.spyOn(Date, "now").mockReturnValue(123);

    await createAppointmentRequest(
      {
        name: "Alex",
        phone: "+380123456789",
        time: "09:00",
        email: "alex@example.com",
        comment: "First visit",
      },
      "psych-1",
      "Dr. Example"
    );

    expect(database.ref).toHaveBeenCalledWith({}, "appointments");
    expect(database.push).toHaveBeenCalledWith(
      "appointments",
      expect.objectContaining({
        name: "Alex",
        psychologistId: "psych-1",
        psychologistName: "Dr. Example",
        createdAt: 123,
      })
    );
  });
});
