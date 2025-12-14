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
  const [prescription, setPrescriptions] = useState([]);
  const { id } = useParams();

      const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB");
  };


  let token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/prescriptions/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setPrescriptions(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPrescriptions();
  }, [id, token]);


  const prescriptionDetails = (
    <>
      <Card key={prescription.id}>  
        <CardHeader>
          <CardTitle className="viewCardHeader">{`Medication: ${prescription.medication}`}</CardTitle>
          <CardDescription className="viewCardSubHeader">{prescription.dosage}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent className="viewCardBody">
          <p>{`Patient ID: ${prescription.patient_id}`}</p>
          <p>{`Diagnosis ID: ${prescription.diagnosis_id}`}</p>
          <p>{`Doctor ID: ${prescription.doctor_id}`}</p>
          <p>{`Start Date: ${formatDate(prescription.start_date)}`}</p>
          <p>{`End Date: ${formatDate(prescription.end_date)}`}</p>

        <CardFooter className="flex justify-end">
          <Button className="mt-50"
            asChild
            variant='outline'
          >    <Link size="sm" to={`/prescriptions/edit/${id}`}>
    Modify Prescription Details
    </Link></Button>

        </CardFooter>

        </CardContent>
       
      </Card>

    </>
  );
 
  return <>Show Prescription
        <div className="dbBackground justify-content-center overflow-x-hidden min-h-screen">



    <div
      className="dbBackground justify-content-center overflow-x-hidden"
      style={{ minWidth: 'calc(98vw - var(--sidebar-width))' }}
    >
     <div className="m-5 grid grid-cols-2 gap-6 items-stretch">{prescriptionDetails} </div>
</div>
</div>

  
  </>;
}
