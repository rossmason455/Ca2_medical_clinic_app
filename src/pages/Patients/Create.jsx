import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  specialisation: z.string().optional(),
  email: z.email("Invalid email address").optional(),
  phone: z.string().optional(),
});

export default function Create() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        address: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const createPatient = async () => {
        const token = localStorage.getItem("token");

        const options = {
            method: "POST",
            url: `https://ca2-med-api.vercel.app/patients`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: form
        };

        try {
            let response = await axios.request(options);
            console.log(response.data);
            navigate('/patients');
        } catch (err) {
            console.log(err.response.data.error.issues);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        console.log(form.date_of_birth, typeof form.date_of_birth)
        createPatient();
    };

  return (
    <>
        <h1>Add new Patient</h1>
        <form onSubmit={handleSubmit}>
            <Input 
                type="text" 
                placeholder="First Name" 
                name="first_name" 
                value={form.first_name} 
                onChange={handleChange} 
            />
            <Input 
                type="text" 
                placeholder="Last Name" 
                name="last_name" 
                value={form.last_name} 
                onChange={handleChange} 
            />

            <Input 
                className="mt-2"
                type="text" 
                placeholder="Email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
            />
            <Input 
                className="mt-2"
                type="text" 
                placeholder="Phone" 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
            />
            <Input 
                className="mt-2"
                type="number" 
                placeholder="Date of Birth" 
                name="date_of_birth" 
                value={form.date_of_birth} 
                onChange={handleChange} 
            />
            <Input 
                className="mt-2"
                type="text" 
                placeholder="Address" 
                name="address" 
                value={form.address} 
                onChange={handleChange} 
            />
            <Button 
                className="mt-4 cursor-pointer" 
                variant="outline" 
                type="submit" 
            >Submit</Button>
        </form>
    </>
  );
}








const doctorSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  specialisation: z.string().optional(),
  email: z.email("Invalid email address").optional(),
  phone: z.string().optional(),
});


export default function Create() {
    const navigate = useNavigate();

      const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      specialisation: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://ca2-med-api.vercel.app/doctors", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/doctors");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <>
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create a new Doctor</CardTitle>
        <CardDescription>Enter the doctor's details</CardDescription>
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
            <Label htmlFor="specialisation">Specialisation</Label>
            <Input id="specialisation" {...register("specialisation")} />
            {errors.specialisation && <p className="text-sm text-red-500">{errors.specialisation.message}</p>}
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