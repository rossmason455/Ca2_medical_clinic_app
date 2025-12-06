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
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/doctors",
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setDoctors(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoctors();
  }, []);

   const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://ca2-med-api.vercel.app/prescriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setDoctors(doctors.filter(doctor => doctor.id !== id));
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
    <Link size="sm" to="/doctors/create">
      Create New Doctor
    </Link>
  </Button>
);

  const doctorsCards = doctors.map((doctor) => {
    return (
      


      <Card key={doctor.id}>  
        <CardHeader>
          <CardTitle>Dr. {`${doctor.first_name} ${doctor.last_name}`}</CardTitle>
          <CardDescription>{doctor.specialisation}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>Email: {doctor.email}</p>
          <p>Phone: {doctor.phone}</p>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant='outline'
          ><Link size='md' to={`/Doctors/${doctor.id}`}>View</Link></Button>

          <Button
            variant='destructive'
            onClick={() => handleDelete(doctor.id)}
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
      <h1>Doctors page</h1>
      {dashboard}
      {createButton}
      {doctorsCards}
    </>
  );
}
