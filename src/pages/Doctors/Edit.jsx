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

import {IconArrowNarrowLeft
} from "@tabler/icons-react";


import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const doctorSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  specialisation: z.string().min(1, "Specialization is required"),
   email: z
    .string()
    .min(1, "Email is required")
    // Email validation using regex to ensure proper email format
    .refine((val) => /^\S+@\S+\.\S+$/.test(val), { message: "Invalid email address" }),
  phone: z.string().optional(),
});


export default function EditDoctor() {
    const navigate = useNavigate();
    const { id } = useParams();

      const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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

    // useEffect to fetch existing doctor data on component mount and reset the form with fetched values
    useEffect(() => {

    const token = localStorage.getItem("token");
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`https://ca2-med-api.vercel.app/doctors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        reset({
          first_name: res.data.first_name ?? "",
          last_name: res.data.last_name ?? "",
          specialisation: res.data.specialisation ?? "",
          email: res.data.email ?? "",
          phone: res.data.phone ?? "",
        });
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };
    fetchDoctor();
  }, [id, reset]);

  // onSubmit: handles form submission by patching doctor data to API and navigating back to doctors list
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`https://ca2-med-api.vercel.app/doctors/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/doctors");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };


     // Back button component: circular button linking back to the doctor's detail view page
     const backButton = (
      <Button
    asChild
    variant="outline"
    className="!rounded-full w-20 h-20 items-center ml-10 border-3"
  >
    <Link to={`/doctors/${id}`}>
    <IconArrowNarrowLeft className=" size-15" />
    </Link>
      </Button>
);

  const editForm = (    
  
  <Card className="w-full">
      <CardHeader>
        <CardTitle className="viewCardHeader">Modify Doctor Details</CardTitle>
        <CardDescription className="viewCardSubHeader">Enter the doctor's details</CardDescription>
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
    </Card>);

  return (
    <>

    
    <div className='dbBackground'>
      {backButton}
    <div className=" min-h-screen">



    {/* Container div with padding and margin, width calculated to account for sidebar width (282px) */}
    <div
      className="pl-150 pr-150 mt-40"
      style={{ width: 'calc(100vw - 282px)' }}
    >
{editForm}
</div>
</div>
</div>
    </>
  );
}