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

const diagnosisSchema = z.object({
  patient_id: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : Number(value)),
    z.number().min(1, "Patient ID is required")
  ),
  condition: z.string().min(1, "Condition is required"),
  diagnosis_date: z.string().min(1, "Diagnosis Date is required"),
});

   export default function CreateDiagnosis() {
    const navigate = useNavigate();

      const  {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
        condition: "",
        patient_id: "",
        diagnosis_date: ""
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://ca2-med-api.vercel.app/diagnoses", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/diagnoses");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <>
          <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create a new Diagnosis</CardTitle>
          <CardDescription>Record a diagnosis for a patient</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="patient_id">Patient ID</Label>
              <Input id="patient_id" type="number" {...register("patient_id")} />
              {errors.patient_id && <p className="text-sm text-red-500">{errors.patient_id.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="condition">Condition</Label>
              <Input id="condition" {...register("condition")} />
              {errors.condition && <p className="text-sm text-red-500">{errors.condition.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="diagnosis_date">Diagnosis Date</Label>
              <Input id="diagnosis_date" {...register("diagnosis_date")} placeholder="YYYY-MM-DD or unix seconds" />
              {errors.diagnosis_date && <p className="text-sm text-red-500">{errors.diagnosis_date.message}</p>}
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