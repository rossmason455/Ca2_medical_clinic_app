import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';


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
      <h2>{`Diagnosis: ${diagnosis.condition}`}</h2>
      <p>Patient ID: {diagnosis.patient_id}</p>
      <p>Diagnosis Date: {diagnosis.diagnosis_date}</p>

    </>
  );
 
  return <>Show Diagnosis
    {diagnosisDetails} 
    {editButton}
  
  </>;
}
