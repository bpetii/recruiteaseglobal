import { AppointmentStatus } from "@prisma/client";

export const APPOINTMENT_STATUS = {
  [AppointmentStatus.ACCEPTED]: "Eflogadva",
  [AppointmentStatus.REJECTED]: "Elutasítva",
  [AppointmentStatus.PENDING]: "Függőben",
};
