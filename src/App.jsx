import { useState, useEffect} from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from '@/components/Navbar';
import Register from '@/pages/Register';
import LogIn from '@/pages/LogIn';

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
        <Navbar onLogin={onLogin} loggedIn={loggedIn} />
        <Routes>
           <Route path='/Register' element={<Register onRegister={onRegister}/>} />
          <Route path='/LogIn' element={<LogIn onLogin={onLogin} loggedIn={loggedIn} />} />

          <Route path="/festivals" element={<FestivalsIndex />} />
          <Route path="/festivals/:id" element={<FestivalsShow loggedIn={loggedIn} />} />

        </Routes>
      </Router>
    </>
  )
}