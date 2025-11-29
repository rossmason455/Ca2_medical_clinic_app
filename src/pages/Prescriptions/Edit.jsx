import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useParams } from "react-router";

export default function Edit() {

    const { id } = useParams();

    const [form, setForm] = useState({
        patient_id: "",
        condition: "",
        diagnosis_date: ""
    });
    const navigate = useNavigate();

    

    const handleChange = (e) => {
       const { name, value, type } = e.target;

        setForm({
            ...form,
            [name]: type === "number" ? Number(value) : value
        });
    };

    const editDiagnoses = async () => {
        const token = localStorage.getItem("token");

        const options = {
            method: "PATCH",
            url: `https://ca2-med-api.vercel.app/diagnoses/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: form
        };

        try {
            let response = await axios.request(options);
            console.log(response.data);
            navigate('/diagnoses');
        } catch (err) {
            console.log(err);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        console.log("ID from URL is:", id);
        editDiagnoses();
    };

  return (
    <>
        <h1>Modify Diagnosis Details</h1>
        <form onSubmit={handleSubmit}>
          <Input 
                className="mt-2"
                type="text" 
                placeholder="Condition" 
                name="condition" 
                value={form.condition} 
                onChange={handleChange} 
            />

                <Input 
                className="mt-2"
                type="number" 
                placeholder="Patient ID" 
                name="patient_id" 
                value={form.patient_id} 
                onChange={handleChange} 
            />
                
                <Input 
                className="mt-2"
                type="text" 
                placeholder="Diagnosis Date" 
                name="diagnosis_date" 
                value={form.diagnosis_date} 
                onChange={handleChange} 
            />

            <Button 
                className="mt-4 cursor-pointer" 
                variant="outline" 
                type="submit" 
            >Submit</Button>
        </form>
    </>
  );
}