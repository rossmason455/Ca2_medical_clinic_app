import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router";

import {
  IconTrash,
  IconBinoculars,
  IconCirclePlus
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

export default function Index() {
  const [patients, setPatients] = useState([]);


    // formatDate: converts Unix timestamp to localized date string in en-GB format
    const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB");
  };
  
  useEffect(() => {
    const fetchPatients = async () => {
      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/patients",
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setPatients(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPatients();
  }, []);





   // handleDelete: deletes a patient by ID from API (note: URL incorrectly points to prescriptions endpoint)
   const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://ca2-med-api.vercel.app/prescriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPatients(patients.filter(patient => patient.id !== id));
    } catch (err) {
      console.log('Delete failed:', err);

    }
  };

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
    className="mb-4 mr-auto !font-bold !p-8 !text-lg"
  >
    <Link size="sm" to="/patients/create">
      Create New Patient <IconCirclePlus className="size-7" />
    </Link>
  </Button>
);
  const patientCards = patients.map((patient) => {
    return (
      


      <Card key={patient.id} className="max-w-sm max-h-70">  
        <CardHeader>
          <CardTitle className="font-bold text-lg">{`${patient.first_name} ${patient.last_name}`}</CardTitle>
          <CardDescription className="text-base">{`Patient ID: ${patient.id}`}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent className="max-h-60 ">
          <p><span className="font-medium">Email:</span> {patient.email}</p>
          <p><span className="font-medium">Phone:</span> {patient.phone}</p>
          <p><span className="font-medium">Date of Birth:</span> {formatDate(patient.date_of_birth)}</p>
          <p><span className="font-medium">Address:</span> {patient.address}</p>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant='outline'
          ><Link size='md' to={`/patients/${patient.id}`}>View<IconBinoculars /></Link></Button>

          <Button
            variant='destructive'
            onClick={() => handleDelete(patient.id)}
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
  <div className="dbBackground min-h-screen">

    <div className="ml-5">{createButton}</div>  

    {/* Container div with width calculated to account for sidebar width (282px), displaying cards in a grid */}
    <div
      style={{ width: 'calc(100vw - 282px)' }}
    >
 <div className="m-5 grid grid-cols-5 gap-6 items-stretch">{patientCards}</div>
</div>
</div>
    </>
  );
}
