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
  const [patients, setPatients] = useState([]);

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
    <Link size="sm" to="/patients/create">
      Add New Patient
    </Link>
  </Button>
);

  const patientCards = patients.map((patient) => {
    return (
      


      <Card key={patient.id}>  
        <CardHeader>
          <CardTitle>{`${patient.first_name} ${patient.last_name}`}</CardTitle>
          <CardDescription>{`Patient ID: ${patient.id}`}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>{patient.email}</p>
          <p>{patient.phone}</p>
          <p>{patient.date_of_birth}</p>
          <p>{patient.address}</p>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant='outline'
          ><Link size='md' to={`/patients/${patient.id}`}>View</Link></Button>
        </CardFooter>
      </Card>
      
    );
  });

  return (
    <>
      <h1>Patients page</h1>
      {dashboard}
      {createButton}
      {patientCards}
    </>
  );
}
