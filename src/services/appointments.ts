import { push, ref } from "firebase/database";
import { db } from "../firebaseDatabase";
import type { AppointmentFormData } from "../types/PsychologistsType";

export async function createAppointmentRequest(
  data: AppointmentFormData,
  psychologistId: string,
  psychologistName: string
) {
  await push(ref(db, "appointments"), {
    ...data,
    psychologistId,
    psychologistName,
    createdAt: Date.now(),
  });
}
