import { useState, useEffect} from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from '@/components/Navbar';
import MainLayout from '@/components/MainLayout';
import Register from '@/pages/Register';
import LogIn from '@/pages/LogIn';

import Dashboard from '@/pages/Dashboard';
import DoctorsIndex from '@/pages/Doctors/Index';
import DoctorsShow from '@/pages/Doctors/Show';
import DoctorsCreate from '@/pages/Doctors/Create';
import DoctorsEdit from '@/pages/Doctors/Edit';

import PatientsIndex from '@/pages/Patients/Index';
import PatientsShow from '@/pages/Patients/Show';
import PatientsCreate from '@/pages/Patients/Create';
import PatientsEdit from '@/pages/Patients/Edit';

import AppointmentsIndex from '@/pages/Appointments/Index';
import AppointmentsShow from '@/pages/Appointments/Show';
import AppointmentsCreate from '@/pages/Appointments/Create';
import AppointmentsEdit from '@/pages/Appointments/Edit';

import DiagnosesIndex from '@/pages/Diagnoses/Index';
import DiagnosesShow from '@/pages/Diagnoses/Show';
import DiagnosesCreate from '@/pages/Diagnoses/Create';
import DiagnosesEdit from '@/pages/Diagnoses/Edit';

import PrescriptionsIndex from '@/pages/Prescriptions/Index';
import PrescriptionsShow from '@/pages/Prescriptions/Show';
import PrescriptionsCreate from '@/pages/Prescriptions/Create';
import PrescriptionsEdit from '@/pages/Prescriptions/Edit';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

   useEffect(() => {
    let token = localStorage.getItem("token");

    if(token){
      setLoggedIn(true);
    }

  }, []);

  const onLogin = (auth, token) => {
    setLoggedIn(auth);

    if(auth){
      localStorage.setItem('token', token)
    }
    else {
      localStorage.removeItem('token');
    }
  };

  return (
    <>
        
      <Router>
      
        <Routes>
           <Route path='/register' element={<Register onRegister={onLogin}/>} />
          <Route path='/logIn' element={<LogIn onLogin={onLogin} loggedIn={loggedIn} />} />

         
         <Route path='/dashboard'  element={ <MainLayout loggedIn={loggedIn} onLogin={onLogin}><Dashboard loggedIn={loggedIn} /></MainLayout>}/>



          <Route path="/doctors" element={   <DoctorsIndex /> } />
          <Route path="/doctors/create" element={<DoctorsCreate />} />
          <Route path="/doctors/:id" element={<DoctorsShow loggedIn={loggedIn} />} />
          <Route path="/doctors/edit/:id" element={<DoctorsEdit />} />


          <Route path="/patients" element={<PatientsIndex />} />
          <Route path="/patients/create" element={<PatientsCreate />} />
          <Route path="/patients/:id" element={<PatientsShow loggedIn={loggedIn} />} />
          <Route path="/patients/edit/:id" element={<PatientsEdit />} />

          
          <Route path="/appointments" element={<AppointmentsIndex />} />
          <Route path="/appointments/create" element={<AppointmentsCreate />} />
          <Route path="/appointments/:id" element={<AppointmentsShow loggedIn={loggedIn} />} />
          <Route path="/appointments/edit/:id" element={<AppointmentsEdit />} />

          
          <Route path="/diagnoses" element={<DiagnosesIndex />} />
          <Route path="/diagnoses/create" element={<DiagnosesCreate />} />
          <Route path="/diagnoses/:id" element={<DiagnosesShow loggedIn={loggedIn} />} />
          <Route path="/diagnoses/edit/:id" element={<DiagnosesEdit />} />

          <Route path="/prescriptions" element={<PrescriptionsIndex />} />
          <Route path="/prescriptions/create" element={<PrescriptionsCreate />} />
          <Route path="/prescriptions/:id" element={<PrescriptionsShow loggedIn={loggedIn} />} />
          <Route path="/prescriptions/edit/:id" element={<PrescriptionsEdit />} />
        </Routes>

      </Router>
      
    </>
  )
}