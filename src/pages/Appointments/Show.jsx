import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
IconArrowNarrowLeft
} from "@tabler/icons-react";


export default function Show() {
  const [appointment, setAppointment] = useState([]);
  const { id } = useParams();

      const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB");
  };


  let token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointment = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/appointments/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setAppointment(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAppointment();
  }, [id, token]);

   const editButton = (
  <Button
    asChild
    variant="outline"
    className="mb-4 mr-auto block"
  >
    <Link size="sm" to={`/appointments/edit/${id}`}>
    Modify Appointment Details
    </Link>
  </Button>
);


     const backButton = (
      <Button
    asChild
    variant="outline"
    className="!rounded-full w-20 h-20 flex items-center justify-center ml-10 border-3"
  >
    <Link to={`/appointments`}>
    <IconArrowNarrowLeft className=" size-15" />
    </Link>
      </Button>
);

  const appointmentDetails = (
    <>
      <Card key={appointment.id}>  
        <CardHeader>
          <CardTitle className="viewCardHeader">{`Appointment: ${appointment.id}`}</CardTitle>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent className="viewCardBody">
          <p>Date: {formatDate(appointment.appointment_date)}</p>
          <p>Doctor ID: {appointment.doctor_id}</p>
          <p>Patient ID: {appointment.patient_id}</p>

        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="mt-50"
            asChild
            variant='outline'
          >    <Link size="sm" to={`/appointments/edit/${id}`}>
    Modify Appointment Details
    </Link></Button>

        </CardFooter>
      </Card>

    </>
  );
 
  return <>

    <div className="dbBackground"> {backButton} 
    <div className="dbBackground justify-content-center overflow-x-hidden min-h-screen">



    <div
      className="dbBackground justify-content-center overflow-x-hidden"
      style={{ width: 'calc(100vw - 282px)' }}
    >
     <div className="w-full pl-150 pr-150 mt-40">{appointmentDetails} </div>
</div>
</div>
</div>
  
  </>;
}
