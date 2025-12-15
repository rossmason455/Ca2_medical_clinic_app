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
          <CardTitle className="viewCardHeader">{`${patient.first_name} ${patient.last_name}`}</CardTitle>
          <CardDescription className="viewCardSubHeader">{`Patient ID: ${patient.id}`}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent className="viewCardBody">
          <p>Email: {patient.email}</p>
          <p>Phone: {patient.phone}</p>
          <p>Date of Birth: {formatDate(patient.date_of_birth)}</p>
          <p>Address: {patient.address}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="mt-50"
            asChild
            variant='outline'
          >    <Link size="sm" to={`/doctors/edit/${id}`}>
    Modify Doctors Details
    </Link></Button>

        </CardFooter>
      </Card>

      
    </>
  );
 
  return <>
    <div className="dbBackground justify-content-center overflow-x-hidden min-h-screen">



    <div
      className="dbBackground justify-content-center overflow-x-hidden"
      style={{ width: 'calc(100vw - 282px)' }}
    >
     <div className="m-5 grid grid-cols-2 gap-6 items-stretch">{patientProfile} </div>
</div>
</div>
  </>;
}
