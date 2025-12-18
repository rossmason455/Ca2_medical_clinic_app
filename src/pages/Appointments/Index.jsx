import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

import { IconTrash, IconBinoculars, IconCirclePlus } from "@tabler/icons-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



import { Button } from "@/components/ui/button";

export default function Index() {
  const [appointments, setAppointments] = useState([]);

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB");
  };

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

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://ca2-med-api.vercel.app/prescriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };


  const createButton = (
  <Button
    asChild
    variant="outline"
    className="mb-4 mr-auto !font-bold !p-8 !text-lg"
  >
    <Link size="sm" to="/appointments/create">
      Create New Appointment <IconCirclePlus className="size-7" />
    </Link>
  </Button>
);



  const appointmentsList = (

    <Table>
      <TableCaption>Recent appointments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-2xl font-extrabold">Doctor ID</TableHead>
          <TableHead className="text-2xl font-extrabold">Patient ID</TableHead>
          <TableHead className="text-2xl font-extrabold">Appointment Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="text-xl font-medium">{appointment.doctor_id} </TableCell>
            <TableCell className="text-xl font-medium">{appointment.patient_id}</TableCell>
            <TableCell className="text-xl font-medium">
              {formatDate(appointment.appointment_date)}


            </TableCell>
            <div className="flex justify-end mt-1">                          
              <Button asChild variant="outline">
                <Link size="md" to={`/appointments/${appointment.id}`}>
                  View
                  <IconBinoculars />
                </Link>
              </Button>

              <Button 
                variant="destructive"
                onClick={() => handleDelete(appointment.id)}
                className="ml-2"
                style={{ color: "red" }}
              >
                <IconTrash />
              </Button></div>

          </TableRow>
        ))}
        {appointments.length === 0 && (
          <TableRow>
            <TableCell colSpan={3} className="text-sm text-muted-foreground">
              No appointments
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>

  );

  return (
    <>
      <div className="dbBackground min-h-screen">
        <div className="ml-5">{createButton}</div>

        <div
          style={{ width: "calc(100vw - 282px)" }}
        >
          <div className="w-full p-5">{appointmentsList}</div>
        </div>
      </div>
    </>
  );
}
