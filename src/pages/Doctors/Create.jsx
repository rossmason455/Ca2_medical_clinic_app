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

const doctorSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  specialisation: z.string().min(1, "Specialization is required"),
  email: z
    .string()
    .min(1, "Email is required")
    // Email validation using regex to ensure proper email format
    .refine((val) => /^\S+@\S+\.\S+$/.test(val), {
      message: "Invalid email address",
    }),
  phone: z.string().optional(),
});

export default function CreateDoctor() {
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

  // onSubmit: handles form submission by posting new doctor data to API and navigating to doctors list on success
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

  // Back button component: circular button linking back to the doctors list page
  const backButton = (
    <Button
      asChild
      variant="outline"
      className="!rounded-full w-20 h-20 flex items-center justify-center ml-10 border-3"
    >
      <Link to={`/doctors`}>
        <IconArrowNarrowLeft className=" size-15" />
      </Link>
    </Button>
  );

  const createForm = (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="viewCardHeader">Create a new Doctor</CardTitle>
        <CardDescription className="viewCardSubHeader">
          Enter the doctor's details
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              placeholder="e.g. John"
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-sm text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              placeholder="e.g. Doe"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-sm text-red-500">{errors.last_name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="specialisation">Specialisation</Label>
            <Input
              id="specialisation"
              placeholder="e.g. Cardiology"
              {...register("specialisation")}
            />
            {errors.specialisation && (
              <p className="text-sm text-red-500">
                {errors.specialisation.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. john.doe@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="e.g. 123-456-7890"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
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
  );

  return (
    <>
      <div className="dbBackground">
        {backButton}

        <div className="min-h-screen">
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
