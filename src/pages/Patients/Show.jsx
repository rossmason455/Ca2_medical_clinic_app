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

export default function Show() {
  const [patient, setPatient] = useState([]);
  const { id } = useParams();


      const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB");
  };

  let token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPatient = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/patients/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setPatient(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPatient();
  }, [id, token]);


  const patientProfile = (
    <>
      <Card key={patient.id}>  
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
          ><Link size="sm" to={`/patients/edit/${id}`}>
    Modify Patient Details
    </Link></Button>

        </CardFooter>
      </Card>

      
    </>
  );
 
  return <>Show Patient
    {patientProfile} 

  
  </>;
}
