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
  const [diagnosis, setDiagnosis] = useState([]);
  const { id } = useParams();


      const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB");
  };

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

     const backButton = (
      <Button
    asChild
    variant="outline"
    className="!rounded-full w-20 h-20 flex items-center justify-center ml-10 border-3"
  >
    <Link to={`/diagnoses`}>
    <IconArrowNarrowLeft className=" size-15" />
    </Link>
      </Button>
);


  const diagnosisDetails = (
    <>
<Card key={diagnosis.id}>  
        <CardHeader>
          <CardTitle className="viewCardHeader">{`Diagnosis: ${diagnosis.condition}`}</CardTitle>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent className="viewCardBody">
          <p>{`Patient ID: ${diagnosis.patient_id}`}</p>
          <p>{`Diagnosis Date: ${formatDate(diagnosis.diagnosis_date)}`}</p>


        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="mt-50"
            asChild
            variant='outline'
          >    <Link size="sm" to={`/diagnoses/edit/${id}`}>
    Modify Diagnosis Details
    </Link></Button>

        </CardFooter>
      </Card>

    </>
  );
 
  return <>

        <div className="dbBackground"> {backButton} 
        <div className="dbBackground justify-content-center overflow-x-hidden min-h-screen">



    <div
      className="dbBackground justify-content-center overflow-x-hidden"
      style={{ width: 'calc(100vw - 282px)' }}
    >
     <div className="w-full pl-150 pr-150 mt-40">{diagnosisDetails} </div>
</div>
</div>
</div>
  
  </>;
}
