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
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {

      const token = localStorage.getItem('token');

      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/prescriptions",
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
  }, []);


  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://ca2-med-api.vercel.app/prescriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPrescriptions(prescriptions.filter(prescription => prescription.id !== id));
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
    <Link size="sm" to="/prescriptions/create">
      Add New Prescription
    </Link>
  </Button>
);

  const prescriptionsCards = prescriptions.map((prescription) => {
    return (
      


      <Card key={prescription.id}>  
        <CardHeader>
          <CardTitle>{`Medication: ${prescription.medication}`}</CardTitle>
          <CardDescription>{prescription.dosage}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>{`Patient ID: ${prescription.patient_id}`}</p>
          <p>{`Diagnosis ID: ${prescription.diagnosis_id}`}</p>
          <p>{`Doctor ID: ${prescription.doctor_id}`}</p>
          <p>{`Start Date: ${prescription.start_date}`}</p>
          <p>{`End Date: ${prescription.end_date}`}</p>



        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant='outline'
          ><Link size='md' to={`/prescriptions/${prescription.id}`}>View</Link></Button>

                    <Button
            variant='destructive'
            onClick={() => handleDelete(prescription.id)}
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
      <h1>Prescriptions page</h1>
      {dashboard}
      {createButton}
      {prescriptionsCards}
    </>
  );
}
