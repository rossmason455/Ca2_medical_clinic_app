import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

import {
  IconTrash,
  IconBinoculars
} from "@tabler/icons-react"

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
import { bg } from "zod/v4/locales";

export default function Index() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/doctors",
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setDoctors(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoctors();
  }, []);

   const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://ca2-med-api.vercel.app/prescriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setDoctors(doctors.filter(doctor => doctor.id !== id));
    } catch (err) {
      console.log('Delete failed:', err);

    }
  };

  const dashboard = (
      <Button
    asChild
    variant="outline"
    className="mb-4 mr-auto"
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
    className="mb-4 mr-auto"
  >
    <Link size="sm" to="/doctors/create">
      Create New Doctor
    </Link>
  </Button>
);

  const doctorsCards = doctors.map((doctor) => {
    return (
      


      <Card key={doctor.id} className="max-w-sm max-h-64">  
        <CardHeader>
          <CardTitle>Dr. {`${doctor.first_name} ${doctor.last_name}`}</CardTitle>
          <CardDescription>{doctor.specialisation}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>Email: {doctor.email}</p>
          <p>Phone: {doctor.phone}</p>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant='outline'
          ><Link size='md' to={`/Doctors/${doctor.id}`}><IconBinoculars /></Link></Button>

          <Button
            variant='destructive'
            onClick={() => handleDelete(doctor.id)}
            className="ml-2"
            style={{ color: 'red'}}
          >
            <IconTrash />
          </Button>
        </CardFooter>
      </Card>
      
    );
  });

  return (
    <>

  <div className="ml-6 justify-content-center overflow-x-hidden">

  
      {createButton}

<div className="w-full">
 <div className="grid grid-cols-5 gap-6 items-stretch">{doctorsCards}</div>
</div>
</div>
    </>
  );
}
