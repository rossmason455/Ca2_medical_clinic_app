import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
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

import { IconArrowNarrowLeft } from "@tabler/icons-react";

const diagnosisSchema = z.object({
  // patient_id: preprocess string to number, convert empty string to undefined, then validate as number >=1
  patient_id: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === ""
        ? undefined
        : Number(value),
    z.number().min(1, "Patient ID is required")
  ),
  condition: z.string().min(1, "Condition is required"),
  diagnosis_date: z.string().min(1, "Diagnosis Date is required"),
});

export default function EditDiagnosis() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      condition: "",
      patient_id: "",
      diagnosis_date: "",
    },
  });

  // useEffect to fetch existing diagnosis data on component mount and reset the form with fetched values
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDiagnosis = async () => {
      try {
        const res = await axios.get(
          `https://ca2-med-api.vercel.app/diagnoses/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        reset({
          condition: res.data.condition ?? "",
          patient_id: res.data.patient_id ?? "",
          diagnosis_date: res.data.diagnosis_date ?? "",
        });
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };
    fetchDiagnosis();
  }, [id, reset]);

  // onSubmit: handles form submission by patching diagnosis data to API and navigating back to diagnoses list
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `https://ca2-med-api.vercel.app/diagnoses/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/diagnoses");
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
      <Link to={`/diagnoses/${id}`}>
        <IconArrowNarrowLeft className=" size-15" />
      </Link>
    </Button>
  );

  const editForm = (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="viewCardTitle">Edit Diagnosis</CardTitle>
          <CardDescription className="viewCardDescription">
            Update the diagnosis for a patient
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="patient_id">Patient ID</Label>
              <Input
                id="patient_id"
                type="number"
                {...register("patient_id")}
              />
              {errors.patient_id && (
                <p className="text-sm text-red-500">
                  {errors.patient_id.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="condition">Condition</Label>
              <Input id="condition" {...register("condition")} />
              {errors.condition && (
                <p className="text-sm text-red-500">
                  {errors.condition.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="diagnosis_date">Diagnosis Date</Label>
              <Input
                id="diagnosis_date"
                {...register("diagnosis_date")}
                placeholder="YYYY-MM-DD or unix seconds"
              />
              {errors.diagnosis_date && (
                <p className="text-sm text-red-500">
                  {errors.diagnosis_date.message}
                </p>
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
            {isSubmitting ? "Saving…" : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );

  return (
    <>
      <div className="dbBackground">
        {backButton}
        <div className="dbBackground justify-content-center overflow-x-hidden min-h-screen flex">
          <div
            className="dbBackground justify-content-center overflow-x-hidden justify-center pl-150 pr-150 mt-40"
            style={{ width: "calc(100vw - 282px)" }}
          >
            {editForm}
          </div>
        </div>
      </div>
    </>
  );
}
