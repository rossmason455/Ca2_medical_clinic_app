import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";


import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const prescriptionSchema = z.object({
  patient_id: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : Number(value)),
    z.number().min(1, "Patient ID is required")
  ),
  doctor_id: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : Number(value)),
    z.number().min(1, "Doctor ID is required")
  ),
  diagnosis_id: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : Number(value)),
    z.number().min(1, "Diagnosis ID is required")
  ),
  medication: z.string().min(1, "Medication is required"),
  dosage: z.string().min(1, "Dosage is required"),
  start_date: z.string().min(1, "Start Date is required"),
  end_date: z.string().min(1, "End Date is required"),
});

  export default function CreatePrescription() {
    const navigate = useNavigate();

      const  {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
        patient_id: "",
        doctor_id: "",
        diagnosis_id: "",
        medication: "",
        dosage: "",
        start_date: "",
        end_date: ""
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://ca2-med-api.vercel.app/prescriptions", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/prescriptions");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };


  return (
    <>
          <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create a new Prescription</CardTitle>
        <CardDescription>Record a prescription for a patient</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="patient_id">Patient ID</Label>
            <Input id="patient_id" type="number" {...register("patient_id")} />
            {errors.patient_id && <p className="text-sm text-red-500">{errors.patient_id.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="doctor_id">Doctor ID</Label>
            <Input id="doctor_id" type="number" {...register("doctor_id")} />
            {errors.doctor_id && <p className="text-sm text-red-500">{errors.doctor_id.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="diagnosis_id">Diagnosis ID</Label>
            <Input id="diagnosis_id" type="number" {...register("diagnosis_id")} />
            {errors.diagnosis_id && <p className="text-sm text-red-500">{errors.diagnosis_id.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="medication">Medication</Label>
            <Input id="medication" {...register("medication")} />
            {errors.medication && <p className="text-sm text-red-500">{errors.medication.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input id="dosage" {...register("dosage")} />
            {errors.dosage && <p className="text-sm text-red-500">{errors.dosage.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="start_date">Start Date</Label>
            <Input id="start_date" {...register("start_date")} placeholder="YYYY-MM-DD or unix seconds" />
            {errors.start_date && <p className="text-sm text-red-500">{errors.start_date.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="end_date">End Date</Label>
            <Input id="end_date" {...register("end_date")} placeholder="YYYY-MM-DD or unix seconds" />
            {errors.end_date && <p className="text-sm text-red-500">{errors.end_date.message}</p>}
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button variant="outline" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Creating…" : "Submit"}
        </Button>
      </CardFooter>
    </Card>
    </>
  );
}