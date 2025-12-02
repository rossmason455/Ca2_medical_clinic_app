import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function RegisterForm({onRegister}) {
    const navigate = useNavigate();
 
 
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://ca2-med-api.vercel.app/register", data);
      onRegister(true, response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Register to create your account</CardTitle>
        <CardDescription>
          Enter your details below to register a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" {...register("first_name")} placeholder="John" />
            {errors.first_name && <p className="text-sm text-red-500">{errors.first_name.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" {...register("last_name")} placeholder="Doe" />
            {errors.last_name && <p className="text-sm text-red-500">{errors.last_name.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} placeholder="m@example.com" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant='outline' onClick={handleSubmit(onSubmit)} className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Registering…" : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
}
