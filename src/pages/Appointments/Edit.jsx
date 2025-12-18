import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';


import axios from 'axios';
import { useNavigate } from 'react-router';
import { useParams } from "react-router";
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

import {IconArrowNarrowLeft
} from "@tabler/icons-react";


const appointmentSchema = z.object({
  appointment_date: z.string().min(1, "Appointment date is required"),
  doctor_id: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : Number(value)),
    z.number().min(1, "Doctor ID is required")
  ),
  patient_id: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : Number(value)),
    z.number().min(1, "Patient ID is required")
  ),
});








   export default function EditAppointment() {
    const navigate = useNavigate();
    const { id } = useParams();

      const  {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
        appointment_date: "",
        doctor_id: "",
        patient_id: ""
    },
  });


    useEffect(() => {

    const token = localStorage.getItem("token");
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`https://ca2-med-api.vercel.app/appointments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        reset({
          appointment_date: res.data.appointment_date ?? "",
          doctor_id: res.data.doctor_id ?? "",
          patient_id: res.data.patient_id ?? "",
        });
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };
    fetchAppointment();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`https://ca2-med-api.vercel.app/appointments/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/appointments");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

     const backButton = (
      <Button
    asChild
    variant="outline"
    className="!rounded-full w-20 h-20 items-center ml-10 border-3"
  >
    <Link to={`/appointments/${id}`}>
    <IconArrowNarrowLeft className=" size-15" />
    </Link>
      </Button>
);


  const editForm = (
    <>
  <Card className="w-full">
      <CardHeader>
        <CardTitle className="viewCardTitle">Edit Appointment</CardTitle>
        <CardDescription className="viewCardDescription">Update appointment details</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="appointment_date">Appointment Date</Label>
            <Input
              id="appointment_date"
              {...register("appointment_date")}
              placeholder="YYYY-MM-DD or unix seconds"
            />
            {errors.appointment_date && (
              <p className="text-sm text-red-500">{errors.appointment_date.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="doctor_id">Doctor ID</Label>
            <Input id="doctor_id" type="number" {...register("doctor_id")} />
            {errors.doctor_id && <p className="text-sm text-red-500">{errors.doctor_id.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="patient_id">Patient ID</Label>
            <Input id="patient_id" type="number" {...register("patient_id")} />
            {errors.patient_id && <p className="text-sm text-red-500">{errors.patient_id.message}</p>}
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button variant="outline" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save"}
        </Button>
      </CardFooter>
    </Card>
    </>
  );


    return (
    <>
    <div className='dbBackground'>
      {backButton}
    <div className=" min-h-screen">



    <div
      className=" pl-150 pr-150 mt-40"
      style={{ width: 'calc(100vw - 282px)' }}
    >
{editForm}
</div>
</div>
</div>
    </>
  );
}