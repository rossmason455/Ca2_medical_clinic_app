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
        Specialization: "",
        email: "",
        phone: ""
    });
    const navigate = useNavigate();

    

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const editDoctor = async () => {
        const token = localStorage.getItem("token");

        const options = {
            method: "PATCH",
            url: `https://ca2-med-api.vercel.app/doctors/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: form
        };

        try {
            let response = await axios.request(options);
            console.log(response.data);
            navigate('/doctors');
        } catch (err) {
            console.log(err);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        editDoctor();
    };

  return (
    <>
        <h1>Modify Doctor Details</h1>
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
                placeholder="Specialization" 
                name="specialisation" 
                value={form.specialisation} 
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
            <Button 
                className="mt-4 cursor-pointer" 
                variant="outline" 
                type="submit" 
            >Submit</Button>
        </form>
    </>
  );
}