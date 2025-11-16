import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';


export default function Show() {
  const [doctor, setDoctor] = useState([]);
  const { id } = useParams();

  let token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDoctor = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/doctors/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setDoctor(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoctor();
  }, [id, token]);

   const editButton = (
  <Button
    asChild
    variant="outline"
    className="mb-4 mr-auto block"
  >
    <Link size="sm" to="/doctors/edit">
    Modify Doctors Details
    </Link>
  </Button>
);

  const doctorProfile = (
    <>
      <h2>{`Dr. ${doctor.first_name} ${doctor.last_name}`}</h2>
      <p>Specialization: {doctor.specialisation}</p>
      <p>Email: {doctor.email}</p>
      <p>Phone: {doctor.phone}</p>
    </>
  );
 
  return <>Show Doctor
    {doctorProfile} 
    {editButton}
  
  </>;
}
