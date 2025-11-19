import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useParams } from "react-router";

export default function Edit() {

    const { id } = useParams();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        address: ""
    });
    const navigate = useNavigate();

    

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const editPatient = async () => {
        const token = localStorage.getItem("token");

        const options = {
            method: "PATCH",
            url: `https://ca2-med-api.vercel.app/patients/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: form
        };

        try {
            let response = await axios.request(options);
            console.log(response.data);
            navigate('/patients');
        } catch (err) {
            console.log(err.response.data.error.issues);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        editPatient();
    };

  return (
    <>
        <h1>Modify Patient Details</h1>
        <form onSubmit={handleSubmit}>
            <Input 
                type="text" 
                placeholder="First Name" 
                name="first_name" 
                value={form.first_name} 
                onChange={handleChange} 
            />
            <Input 
                type="text" 
                placeholder="Last Name" 
                name="last_name" 
                value={form.last_name} 
                onChange={handleChange} 
            />
           <Input 
                className="mt-2"
                type="text" 
                placeholder="Email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
            />
            <Input 
                className="mt-2"
                type="text" 
                placeholder="Phone" 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
            />
            <Input 
                className="mt-2"
                type="number" 
                placeholder="Date of Birth" 
                name="date_of_birth" 
                value={form.date_of_birth} 
                onChange={handleChange} 
            />
            <Input 
                className="mt-2"
                type="text" 
                placeholder="Address" 
                name="address" 
                value={form.address} 
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