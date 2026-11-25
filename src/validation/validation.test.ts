import { describe, expect, it } from "vitest";
import { appointmentSchema, authSchema } from "./validation";

describe("form validation", () => {
  it("accepts international registration names", async () => {
    await expect(
      authSchema.isValid({
        name: "Ірина Шевченко",
        email: "iryna@example.com",
        password: "secret123",
      })
    ).resolves.toBe(true);
  });

  it("requires every appointment field", async () => {
    await expect(
      appointmentSchema.isValid({
        name: "",
        phone: "",
        time: "",
        email: "",
        comment: "",
      })
    ).resolves.toBe(false);
    await expect(
      appointmentSchema.isValid({
        name: "   ",
        phone: "+380123456789",
        time: "09:00",
        email: "alex@example.com",
        comment: "   ",
      })
    ).resolves.toBe(false);
  });
});
