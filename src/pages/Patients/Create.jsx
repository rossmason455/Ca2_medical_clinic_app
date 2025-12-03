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


const patientSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
   email: z
    .string()
    .min(1, "Email is required")
    .refine((val) => /^\S+@\S+\.\S+$/.test(val), { message: "Invalid email address" }),
  phone: z.string().min(10, "Phone number is required"),
    date_of_birth: z.string().min(1, "Date of Birth is required"),
    address: z.string().min(1, "Address is required")

    
});


    export default function CreatePatient() {
    const navigate = useNavigate();

      const  {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        address: ""
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://ca2-med-api.vercel.app/patients", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/patients");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };


  return (
    <>
         <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create a new Patient</CardTitle>
          <CardDescription>Enter the patient's details</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" {...register("first_name")} />
              {errors.first_name && <p className="text-sm text-red-500">{errors.first_name.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" {...register("last_name")} />
              {errors.last_name && <p className="text-sm text-red-500">{errors.last_name.message}</p>}
            </div>


            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input id="date_of_birth" {...register("date_of_birth")} placeholder="YYYY-MM-DD or unix timestamp" />
              {errors.date_of_birth && <p className="text-sm text-red-500">{errors.date_of_birth.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register("address")} />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
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








