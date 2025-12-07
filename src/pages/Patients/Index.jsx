import { useEffect, useState, useRef } from "react";
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
    className="mb-4 mr-auto block"
  >
    <Link size="sm" to="/patients/create">
      Add New Patient
    </Link>
  </Button>
);

  const patientCards = patients.map((patient) => {
    return (
      


      <Card key={patient.id} className="max-w-sm max-h-64">  
        <CardHeader>
          <CardTitle>{`${patient.first_name} ${patient.last_name}`}</CardTitle>
          <CardDescription>{`Patient ID: ${patient.id}`}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>Email: {patient.email}</p>
          <p>Phone: {patient.phone}</p>
          <p>Date of Birth: {formatDate(patient.date_of_birth)}</p>
          <p>Address: {patient.address}</p>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant='outline'
          ><Link size='md' to={`/patients/${patient.id}`}>View</Link></Button>

          <Button
            variant='destructive'
            onClick={() => handleDelete(patient.id)}
            className="ml-2"
            style={{ backgroundColor: 'red', borderBottomColor: 'red' }}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
      
    );
  });

  return (
    <>



          {patientCards}

    </>
  );
}
