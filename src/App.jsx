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
         <Route path='/dashboard'  element={
    <MainLayout loggedIn={loggedIn} onLogin={onLogin}>
      <Dashboard loggedIn={loggedIn} />
    </MainLayout>
  }
/>
          <Route path="/doctors" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}>   <DoctorsIndex /> </MainLayout>} />
          <Route path="/doctors/create" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><DoctorsCreate /></MainLayout>} />
          <Route path="/doctors/:id" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><DoctorsShow loggedIn={loggedIn} /></MainLayout>} />
          <Route path="/doctors/edit/:id" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><DoctorsEdit /></MainLayout>} />


          <Route path="/patients" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><PatientsIndex /></MainLayout>} />
          <Route path="/patients/create" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><PatientsCreate /></MainLayout>} />
          <Route path="/patients/:id" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><PatientsShow loggedIn={loggedIn} /></MainLayout>} />
          <Route path="/patients/edit/:id" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><PatientsEdit /></MainLayout>} />

          
          <Route path="/appointments" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><AppointmentsIndex /></MainLayout>} />
          <Route path="/appointments/create" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><AppointmentsCreate /></MainLayout>} />
          <Route path="/appointments/:id" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><AppointmentsShow loggedIn={loggedIn} /></MainLayout>} />
          <Route path="/appointments/edit/:id" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><AppointmentsEdit /></MainLayout>} />

          
          <Route path="/diagnoses" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><DiagnosesIndex /></MainLayout>} />
          <Route path="/diagnoses/create" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><DiagnosesCreate /></MainLayout>} />
          <Route path="/diagnoses/:id" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><DiagnosesShow loggedIn={loggedIn} /></MainLayout>} />
          <Route path="/diagnoses/edit/:id" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><DiagnosesEdit /></MainLayout>} />

          <Route path="/prescriptions" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><PrescriptionsIndex /></MainLayout>} />
          <Route path="/prescriptions/create" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><PrescriptionsCreate /></MainLayout>} />
          <Route path="/prescriptions/:id" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><PrescriptionsShow loggedIn={loggedIn} /></MainLayout>} />
          <Route path="/prescriptions/edit/:id" element={<MainLayout loggedIn={loggedIn} onLogin={onLogin}><PrescriptionsEdit /></MainLayout>} />
        </Routes>
      </Router>
    </>
  )
}