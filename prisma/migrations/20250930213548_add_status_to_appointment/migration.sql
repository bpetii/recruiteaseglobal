-- CreateEnum
CREATE TYPE "public"."AppointmentStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."Appointment" ADD COLUMN     "status" "public"."AppointmentStatus" NOT NULL DEFAULT 'PENDING';
