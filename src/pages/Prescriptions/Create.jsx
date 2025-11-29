import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Create() {
    const [form, setForm] = useState({
        medication: "",
        dosage: "",
        start_date: "",
        end_date: "",

    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setForm({
            ...form,
            [name]: type === "number" ? Number(value) : value
        });
    };

    const createPrescription = async () => {
        const token = localStorage.getItem("token");

        



        const options = {
            method: "POST",
            url: `https://ca2-med-api.vercel.app/prescriptions`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: form
        };

        try {
            let response = await axios.request(options);
            console.log(response.data);
            navigate('/prescriptions');
        } catch (err) {
            console.log(err.response.data);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        createPrescription();
    };

  return (
    <>
        <h1>Add new Prescription</h1>
        <form onSubmit={handleSubmit}>
                <Input 
                className="mt-2"
                type="text" 
                placeholder="Medication" 
                name="medication" 
                value={form.medication} 
                onChange={handleChange} 
                />

                <Input 
                className="mt-2"
                type="text" 
                placeholder="Dosage" 
                name="dosage" 
                value={form.dosage} 
                onChange={handleChange} 
                />
                
                <Input 
                className="mt-2"
                type="number" 
                placeholder="Start Date" 
                name="start_date" 
                value={form.start_date} 
                onChange={handleChange} 
            />

                <Input 
                className="mt-2"
                type="number" 
                placeholder="End Date" 
                name="end_date" 
                value={form.end_date} 
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