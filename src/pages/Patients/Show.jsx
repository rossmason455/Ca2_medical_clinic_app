import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';


export default function Show() {
  const [patient, setPatient] = useState([]);
  const { id } = useParams();

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

   const editButton = (
  <Button
    asChild
    variant="outline"
    className="mb-4 mr-auto block"
  >
    <Link size="sm" to={`/patients/edit/${id}`}>
    Modify Patient Details
    </Link>
  </Button>
);

  const patientProfile = (
    <>
      <h2>{`${patient.first_name} ${patient.last_name}`}</h2>
      <p>Patient ID: {patient.id}</p>
      <p>Email: {patient.email}</p>
      <p>Phone: {patient.phone}</p>
      <p>Date of Birth: {patient.date_of_birth}</p>
      <p>Address: {patient.address}</p>
    </>
  );
 
  return <>Show Patient
    {patientProfile} 
    {editButton}
  
  </>;
}
