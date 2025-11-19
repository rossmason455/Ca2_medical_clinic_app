import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';


export default function Show() {
  const [appointment, setAppointment] = useState([]);
  const { id } = useParams();

  let token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointment = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/appointments/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setAppointment(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAppointment();
  }, [id, token]);

   const editButton = (
  <Button
    asChild
    variant="outline"
    className="mb-4 mr-auto block"
  >
    <Link size="sm" to={`/appointments/edit/${id}`}>
    Modify Appointment Details
    </Link>
  </Button>
);

  const appointmentDetails = (
    <>
      <h2>{`Appointment Date: ${appointment.appointment_date}`}</h2>
      <p>Doctor ID: {appointment.doctor_id}</p>
      <p>Patient ID: {appointment.patient_id}</p>

    </>
  );
 
  return <>Show Appointment
    {appointmentDetails} 
    {editButton}
  
  </>;
}
