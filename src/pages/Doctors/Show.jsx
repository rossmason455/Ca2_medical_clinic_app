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
    <Link size="sm" to={`/doctors/edit/${id}`}>
    Modify Doctors Details
    </Link>
  </Button>
);

  const doctorProfile = (
    <>
      <Card key={doctor.id}>  
        <CardHeader>
          <CardTitle>{`Dr. ${doctor.first_name} ${doctor.last_name}`}</CardTitle>
          <CardDescription>{doctor.specialisation}</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>{doctor.email}</p>
          <p>{doctor.phone}</p>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant='outline'
          >    <Link size="sm" to={`/doctors/edit/${id}`}>
    Modify Doctors Details
    </Link></Button>

        </CardFooter>
      </Card>
    </>
  );
 
  return <>Show Doctor
    {doctorProfile} 

  
  </>;
}
