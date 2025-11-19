import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Create() {
    const [form, setForm] = useState({
        appointment_date: "",
        doctor_id: "",
        patient_id: ""
        
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setForm({
            ...form,
            [name]: type === "number" ? Number(value) : value
        });
    };

    const createAppointment = async () => {
        const token = localStorage.getItem("token");

        const options = {
            method: "POST",
            url: `https://ca2-med-api.vercel.app/appointments`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: form
        };

        try {
            let response = await axios.request(options);
            console.log(response.data);
            navigate('/appointments');
        } catch (err) {
            console.log(err.response.data.error.issues);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        createAppointment();
    };

  return (
    <>
        <h1>Add new Appointment</h1>
        <form onSubmit={handleSubmit}>
                <Input 
                className="mt-2"
                type="string" 
                placeholder="Appointment Date" 
                name="appointment_date" 
                value={form.appointment_date} 
                onChange={handleChange} 
            />

                        <Input 
                className="mt-2"
                type="number" 
                placeholder="Doctor ID" 
                name="doctor_id" 
                value={form.doctor_id} 
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

            <Button 
                className="mt-4 cursor-pointer" 
                variant="outline" 
                type="submit" 
            >Submit</Button>
        </form>
    </>
  );
}