import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import { IconArrowNarrowLeft } from "@tabler/icons-react";

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

  let token = localStorage.getItem("token");

  // useEffect to fetch individual doctor data by ID from API with authorization token on component mount
  useEffect(() => {
    const fetchDoctor = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/doctors/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    <Button asChild variant="outline" className="mb-4 mr-auto block">
      <Link to={`/doctors/edit/${id}`}>Modify Doctors Details</Link>
    </Button>
  );

  // backButton: circular button linking back to the doctors list page
  const backButton = (
    <Button
      asChild
      variant="outline"
      className="!rounded-full w-20 h-20 items-center ml-10 border-3"
    >
      <Link to={`/doctors`}>
        <IconArrowNarrowLeft className=" size-15" />
      </Link>
    </Button>
  );

  const doctorProfile = (
    <>
      <Card className="min-h-100 max-w-200" key={doctor.id}>
        <CardHeader>
          <CardTitle className="viewCardHeader">{`Dr. ${doctor.first_name} ${doctor.last_name}`}</CardTitle>
          <CardDescription className="viewCardSubHeader">
            {doctor.specialisation}
          </CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent className="viewCardBody">
          <p>{doctor.email}</p>
          <p>{doctor.phone}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="mt-50" asChild variant="outline">
            {" "}
            <Link to={`/doctors/edit/${id}`}>Modify Doctors Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );

  return (
    <>
      <div className="dbBackground">
        {backButton}

        <div className=" min-h-screen">
          {/* Container div with width calculated to account for sidebar width (282px), centering the profile card */}
          <div style={{ width: "calc(100vw - 282px)" }}>
            <div className="w-full pl-150 pr-150 mt-40">{doctorProfile} </div>
          </div>
        </div>
      </div>
    </>
  );
}
