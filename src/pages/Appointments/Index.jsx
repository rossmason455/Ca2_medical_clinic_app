import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from '@/components/ui/button'

export default function Index() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {

      const token = localStorage.getItem('token');

      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/appointments",
        headers: {
          Authorization: `Bearer ${token}`
        }
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

  const dashboard = (
      <Button
    asChild
    variant="outline"
    className="mb-4 mr-auto block"
  >
    <Link size="sm" to="/dashboard">
      Dashboard
    </Link>
  </Button>
  )

  const createButton = (
  <Button
    asChild
    variant="outline"
    className="mb-4 mr-auto block"
  >
    <Link size="sm" to="/appointments/create">
      Add New Appointment
    </Link>
  </Button>
);

  const appointmentCards = appointments.map((appointment) => {
    return (
      


      <Card key={appointment.id}>  
        <CardHeader>
          <CardTitle>{`Appointment: ${appointment.id}`}</CardTitle>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>{appointment.appointment_date}</p>
          <p>{appointment.doctor_id}</p>
          <p>{appointment.patient_id}</p>

        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant='outline'
          ><Link size='md' to={`/appointments/${appointment.id}`}>View</Link></Button>
        </CardFooter>
      </Card>
      
    );
  });

  return (
    <>
      <h1>Appointments page</h1>
      {dashboard}
      {createButton}
      {appointmentCards}
    </>
  );
}
