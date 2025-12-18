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


     const backButton = (
      <Button
    asChild
    variant="outline"
    className="!rounded-full w-20 h-20 items-center ml-10 border-3"
  >
    <Link to={`/patients`}>
    <IconArrowNarrowLeft className=" size-15" />
    </Link>
      </Button>
);


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
          >    <Link size="sm" to={`/patients/edit/${id}`}>
    Modify Patient Details
    </Link></Button>

        </CardFooter>
      </Card>

      
    </>
  );
 
  return <>

  <div className="dbBackground"> {backButton} 

    <div className="min-h-screen">



    <div

      style={{ width: 'calc(100vw - 282px)' }}
    >
     <div className="w-full pl-150 pr-150 mt-40">{patientProfile} </div>
</div>
</div>
</div>
  </>;
}
