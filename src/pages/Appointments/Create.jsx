import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { IconArrowNarrowLeft } from "@tabler/icons-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const appointmentSchema = z.object({
  appointment_date: z.string().min(1, "Appointment date is required"),
  // doctor_id: preprocess string to number, convert empty string to undefined, then validate as number >=1
  doctor_id: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === ""
        ? undefined
        : Number(value),
    z.number().min(1, "Doctor ID is required")
  ),
  // patient_id: preprocess string to number, convert empty string to undefined, then validate as number >=1
  patient_id: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === ""
        ? undefined
        : Number(value),
    z.number().min(1, "Patient ID is required")
  ),
});

export default function CreateAppointment() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      appointment_date: "",
      doctor_id: "",
      patient_id: "",
    },
  });

  // onSubmit: handles form submission by posting new appointment data to API and navigating to appointments list on success
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://ca2-med-api.vercel.app/appointments", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/appointments");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Back button component: circular button linking back to the appointments list page
  const backButton = (
    <Button
      asChild
      variant="outline"
      className="!rounded-full w-20 h-20 items-center ml-10 border-3"
    >
      <Link to={`/appointments`}>
        <IconArrowNarrowLeft className=" size-15" />
      </Link>
    </Button>
  );

  const createForm = (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="viewCardHeader">
            Create a new Appointment
          </CardTitle>
          <CardDescription className="viewCardDescription">
            Schedule an appointment between patient and doctor
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="appointment_date">Appointment Date</Label>
              <Input
                id="appointment_date"
                placeholder="e.g. 2023-12-01T10:00:00Z"
                {...register("appointment_date")}
              />
              {errors.appointment_date && (
                <p className="text-sm text-red-500">
                  {errors.appointment_date.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="doctor_id">Doctor ID</Label>
              <Input
                id="doctor_id"
                type="number"
                placeholder="e.g. 1"
                {...register("doctor_id")}
              />
              {errors.doctor_id && (
                <p className="text-sm text-red-500">
                  {errors.doctor_id.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="patient_id">Patient ID</Label>
              <Input
                id="patient_id"
                type="number"
                placeholder="e.g. 1"
                {...register("patient_id")}
              />
              {errors.patient_id && (
                <p className="text-sm text-red-500">
                  {errors.patient_id.message}
                </p>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            variant="outline"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating…" : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );

  return (
    <>
      <div className="dbBackground">
        {backButton}
        <div className=" min-h-screen">
          {/* Container div with padding and margin, width calculated to account for sidebar width (282px) */}
          <div
            className=" pl-150 pr-150 mt-40"
            style={{ width: "calc(100vw - 282px)" }}
          >
            {createForm}
          </div>
        </div>
      </div>
    </>
  );
}
