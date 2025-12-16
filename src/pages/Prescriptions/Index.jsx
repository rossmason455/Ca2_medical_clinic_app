import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

import {
  IconTrash,
  IconBinoculars,
  IconCirclePlus
} from "@tabler/icons-react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



import { Button } from '@/components/ui/button'

export default function Index() {
  const [prescriptions, setPrescriptions] = useState([]);

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-GB");
  };

  useEffect(() => {
    const fetchPrescriptions = async () => {

      const token = localStorage.getItem('token');

      const options = {
        method: "GET",
        url: "https://ca2-med-api.vercel.app/prescriptions",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        setPrescriptions(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPrescriptions();
  }, []);


  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://ca2-med-api.vercel.app/prescriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPrescriptions(prescriptions.filter(prescription => prescription.id !== id));
    } catch (err) {
      console.log('Delete failed:', err);

    }
  };

  const dashboard = (
      <Button
    asChild
    variant="outline"
    className="mb-4 mr-auto"
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
    className="mb-4 mr-auto"
  >
    <Link size="sm" to="/prescriptions/create">
      Create New Prescription <IconCirclePlus />
    </Link>
  </Button>
);

 


  const prescriptionsList = (
    <Table>
          <TableCaption>Recent prescriptions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-2xl font-extrabold">Medication</TableHead>
              <TableHead className="text-2xl font-extrabold">Patient ID</TableHead>
            <TableHead className="text-2xl font-extrabold">Start Date</TableHead>
            <TableHead className="text-2xl font-extrabold">End Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell className="text-xl font-medium">{prescription.medication}</TableCell>
                <TableCell className="text-xl font-medium">{prescription.patient_id}</TableCell>
                <TableCell className="text-xl font-medium">{formatDate(prescription.start_date)}</TableCell>
                <TableCell className="text-xl font-medium">{formatDate(prescription.end_date)}</TableCell>
                 <div className="flex justify-end mt-1">                          
              <Button asChild variant="outline">
                <Link size="md" to={`/prescriptions/${prescription.id}`}>
                  View
                  <IconBinoculars />
                </Link>
              </Button>

              <Button 
                variant="destructive"
                onClick={() => handleDelete(prescription.id)}
                className="ml-2"
                style={{ color: "red" }}
              >
                <IconTrash />
              </Button></div>
              </TableRow>
            ))}
            {prescriptions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-sm text-muted-foreground"
                >
                  No prescriptions
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
  )

  return (
    <>
  <div className="dbBackground justify-content-center overflow-x-hidden min-h-screen">

    <div className="ml-5">{createButton}</div>  

    <div
      className="dbBackground justify-content-center overflow-x-hidden"
      style={{ width: 'calc(100vw - 282px)' }}
    >
 <div className="w-full p-10">{prescriptionsList}</div>
</div>
</div>
    </>
  );
}
