import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");

      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/appointments",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setAppointments(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchDiagnoses = async () => {

      const token = localStorage.getItem('token');

      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/diagnoses",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setDiagnoses(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDiagnoses();
  }, []);

  useEffect(() => {
    const fetchPrescriptions = async () => {

      const token = localStorage.getItem('token');

      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/prescriptions",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setPrescriptions(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPrescriptions();
  }, []);


  const appointmentsCard = (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <div className="text-sm">{appointments.length} total</div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableCaption>Recent appointments</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Doctor ID</TableHead>
              <TableHead>Patient ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.slice(0, 5).map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>{appt.appointment_date}</TableCell>
                <TableCell>{appt.doctor_id}</TableCell>
                <TableCell>{appt.patient_id}</TableCell>
              </TableRow>
            ))}
            {appointments.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-sm text-muted-foreground"
                >
                  No appointments
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="gap-2">
        <Button asChild variant="outline">
          <Link to="/appointments">View all</Link>
        </Button>
      </CardFooter>
    </Card>
  );

  const diagnosesCard = (
    <Card>
      <CardHeader>
        <CardTitle>Diagnosis</CardTitle>
        <div className="text-sm">{diagnoses.length} total</div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableCaption>Recent diagnoses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Condition</TableHead>
              <TableHead>Patient ID</TableHead>
            <TableHead>Diagnosis Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {diagnoses.slice(0, 5).map((diagnosis) => (
              <TableRow key={diagnosis.id}>
                <TableCell>{diagnosis.condition}</TableCell>
                <TableCell>{diagnosis.patient_id}</TableCell>
                <TableCell>{diagnosis.diagnosis_date}</TableCell>
              </TableRow>
            ))}
            {diagnoses.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-sm text-muted-foreground"
                >
                  No appointments
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="gap-2">
        <Button asChild variant="outline">
          <Link to="/diagnoses">View all</Link>
        </Button>
      </CardFooter>
    </Card>
  );

   const prescriptionsCard = (
    <Card>
      <CardHeader>
        <CardTitle>Prescriptions</CardTitle>
        <div className="text-sm">{prescriptions.length} total</div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableCaption>Recent prescriptions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Medication</TableHead>
              <TableHead>Patient ID</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.slice(0, 5).map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell>{prescription.medication}</TableCell>
                <TableCell>{prescription.patient_id}</TableCell>
                <TableCell>{prescription.start_date}</TableCell>
                <TableCell>{prescription.end_date}</TableCell>
              </TableRow>
            ))}
            {diagnoses.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-sm text-muted-foreground"
                >
                  No prescriptions
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="gap-2">
        <Button asChild variant="outline">
          <Link to="/prescriptions">View all</Link>
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <>
      <h1>Appointments page</h1>
      {appointmentsCard}
        {diagnosesCard}
        {prescriptionsCard}
    </>
  );
}
