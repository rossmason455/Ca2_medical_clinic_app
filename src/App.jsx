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
          <Route path="/doctors" element={<DoctorsIndex />} />
          <Route path="/doctors/create" element={<DoctorsCreate />} />
          <Route path="/doctors/:id" element={<DoctorsShow loggedIn={loggedIn} />} />
          <Route path="/doctors/edit" element={<DoctorsEdit />} />


          <Route path="/patients" element={<PatientsIndex />} />
          <Route path="/patients/create" element={<PatientsCreate />} />
          <Route path="/patients/:id" element={<PatientsShow loggedIn={loggedIn} />} />
          <Route path="/patients/edit/:id" element={<PatientsEdit />} />
        </Routes>
      </Router>
    </>
  )
}