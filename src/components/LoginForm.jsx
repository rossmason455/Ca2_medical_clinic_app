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

const loginSchema = z.object({
     email: z
    .string()
    .min(1, "Email is required")
    .refine((val) => /^\S+@\S+\.\S+$/.test(val), { message: "Invalid email address" }),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm({onLogin}) {
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://ca2-med-api.vercel.app/login", data);
      onLogin(true, response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
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
        <Button variant='outline' onClick={handleSubmit(onSubmit)}  className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in…" : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}
