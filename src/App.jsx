import { useState, useEffect} from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from '@/components/Navbar';
import MainLayout from '@/components/MainLayout';
import Register from '@/pages/Register';
import LogIn from '@/pages/LogIn';

import Dashboard from '@/pages/Dashboard';
import FestivalsIndex from '@/pages/festivals/Index';
import FestivalsShow from '@/pages/festivals/Show';


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
          <Route path="/festivals" element={<FestivalsIndex />} />
          <Route path="/festivals/:id" element={<FestivalsShow loggedIn={loggedIn} />} />

        </Routes>
      </Router>
    </>
  )
}