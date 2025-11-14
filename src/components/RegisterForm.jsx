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

export default function RegisterForm({onRegister}) {
    const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    const fetchRegister = async () => {
      const options = {
        method: "POST",
        url: "https://ca2-med-api.vercel.app/register",
        data: form
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);

        onRegister(true, response.data.token);

        navigate("/dashboard");
      } catch (err) {
        console.log(err.response.data);
      }
    };

    fetchRegister();

    console.log(form);
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
        <form onSubmit={submitForm}>
          <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                type="first_name"
                placeholder="John"
                required
                onChange={handleForm}
              />
            </div>
                        <div className="grid gap-2">
              <Label htmlFor="first_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                type="last_name"
                placeholder="Doe"
                required
                onChange={handleForm}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={handleForm}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleForm}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant='outline' onClick={submitForm} type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
