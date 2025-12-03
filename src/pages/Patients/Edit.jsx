import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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


    export default function EditPatient() {
    const navigate = useNavigate();
        const { id } = useParams();

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


      useEffect(() => {

    const token = localStorage.getItem("token");
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`https://ca2-med-api.vercel.app/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        reset({
          first_name: res.data.first_name ?? "",
          last_name: res.data.last_name ?? "",
          email: res.data.email ?? "",
          phone: res.data.phone ?? "",
          date_of_birth: res.data.date_of_birth ?? "",
          address: res.data.address ?? "",
        });
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };
    fetchPatient();
  }, [id]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`https://ca2-med-api.vercel.app/patients/${id}`, data, {
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
          <CardTitle>Edit Patient</CardTitle>
          <CardDescription>Update the patient's details</CardDescription>
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
            {isSubmitting ? "Saving…" : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
