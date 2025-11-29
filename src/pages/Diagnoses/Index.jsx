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
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {

      const token = localStorage.getItem('token');

      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/diagnoses",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setDiagnoses(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDiagnoses();
  }, []);

   const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://ca2-med-api.vercel.app/prescriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setDiagnoses(diagnoses.filter(diagnosis => diagnosis.id !== id));
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
    <Link size="sm" to="/diagnoses/create">
      Add New Diagnosis
    </Link>
  </Button>
);

  const diagnosesCards = diagnoses.map((diagnosis) => {
    return (
      


      <Card key={diagnosis.id}>  
        <CardHeader>
          <CardTitle>{`Diagnosis: ${diagnosis.condition}`}</CardTitle>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>{`Patient ID: ${diagnosis.patient_id}`}</p>
          <p>{`Diagnosis Date: ${diagnosis.diagnosis_date}`}</p>


        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant='outline'
          ><Link size='md' to={`/diagnoses/${diagnosis.id}`}>View</Link></Button>

          <Button
            variant='destructive'
            onClick={() => handleDelete(diagnosis.id)}
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
      <h1>Appointments page</h1>
      {dashboard}
      {createButton}
      {diagnosesCards}
    </>
  );
}
