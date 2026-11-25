import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createAppointmentRequest: vi.fn(),
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
}));

vi.mock("../../services/appointments", () => ({
  createAppointmentRequest: mocks.createAppointmentRequest,
}));
vi.mock("react-hot-toast", () => ({
  default: Object.assign(vi.fn(), {
    error: mocks.toastError,
    success: mocks.toastSuccess,
  }),
}));

import { AppointmentModal } from "./page";

describe("AppointmentModal", () => {
  beforeEach(() => {
    mocks.createAppointmentRequest.mockReset();
    mocks.toastError.mockReset();
    mocks.toastSuccess.mockReset();
  });

  it("submits a valid request and closes only after persistence succeeds", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    mocks.createAppointmentRequest.mockResolvedValueOnce(undefined);

    render(
      <AppointmentModal
        psychologistId="psych-1"
        psychologistName="Dr. Example"
        psychologistAvatar="avatar.jpg"
        onClose={onClose}
      />
    );

    await user.type(screen.getByPlaceholderText("Name"), "Alex");
    await user.type(screen.getByPlaceholderText("+380"), "+380123456789");
    await user.type(screen.getByPlaceholderText("Email"), "alex@example.com");
    await user.type(screen.getByPlaceholderText("Comment"), "First visit");
    fireEvent.click(screen.getByText("00:00"));
    fireEvent.click(screen.getByText("09:00"));
    await user.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => {
      expect(mocks.createAppointmentRequest).toHaveBeenCalledWith(
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
    });
    expect(mocks.toastSuccess).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("keeps the form open and reports a persistence failure", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    mocks.createAppointmentRequest.mockRejectedValueOnce(new Error("offline"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(
      <AppointmentModal
        psychologistId="psych-1"
        psychologistName="Dr. Example"
        psychologistAvatar="avatar.jpg"
        onClose={onClose}
      />
    );

    await user.type(screen.getByPlaceholderText("Name"), "Alex");
    await user.type(screen.getByPlaceholderText("+380"), "+380123456789");
    await user.type(screen.getByPlaceholderText("Email"), "alex@example.com");
    await user.type(screen.getByPlaceholderText("Comment"), "First visit");
    fireEvent.click(screen.getByText("00:00"));
    fireEvent.click(screen.getByText("09:00"));
    await user.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => expect(mocks.toastError).toHaveBeenCalled());
    expect(onClose).not.toHaveBeenCalled();
  });
});
