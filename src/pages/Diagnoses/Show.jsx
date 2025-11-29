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
  const [diagnosis, setDiagnosis] = useState([]);
  const { id } = useParams();

  let token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/diagnoses/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setDiagnosis(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDiagnosis();
  }, [id, token]);

   const editButton = (
  <Button
    asChild
    variant="outline"
    className="mb-4 mr-auto block"
  >
    <Link size="sm" to={`/diagnoses/edit/${id}`}>
    Modify Diagnosis Details
    </Link>
  </Button>
);

  const diagnosisDetails = (
    <>
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
          >    <Link size="sm" to={`/diagnoses/edit/${id}`}>
    Modify Diagnosis Details
    </Link></Button>


        </CardFooter>
      </Card>

    </>
  );
 
  return <>Show Diagnosis
    {diagnosisDetails} 

  
  </>;
}
