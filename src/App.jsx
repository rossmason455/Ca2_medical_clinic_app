import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router";
import Navbar from "@/components/Navbar";
import MainLayout from "@/components/MainLayout";
import Register from "@/pages/Register";
import LogIn from "@/pages/Login";

import SideBar from "@/components/SideBar";
import SiteHeader from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Dashboard from "@/pages/Dashboard";
import DoctorsIndex from "@/pages/Doctors/Index";
import DoctorsShow from "@/pages/Doctors/Show";
import DoctorsCreate from "@/pages/Doctors/Create";
import DoctorsEdit from "@/pages/Doctors/Edit";

import PatientsIndex from "@/pages/Patients/Index";
import PatientsShow from "@/pages/Patients/Show";
import PatientsCreate from "@/pages/Patients/Create";
import PatientsEdit from "@/pages/Patients/Edit";

import AppointmentsIndex from "@/pages/Appointments/Index";
import AppointmentsShow from "@/pages/Appointments/Show";
import AppointmentsCreate from "@/pages/Appointments/Create";
import AppointmentsEdit from "@/pages/Appointments/Edit";

import DiagnosesIndex from "@/pages/Diagnoses/Index";
import DiagnosesShow from "@/pages/Diagnoses/Show";
import DiagnosesCreate from "@/pages/Diagnoses/Create";
import DiagnosesEdit from "@/pages/Diagnoses/Edit";

import PrescriptionsIndex from "@/pages/Prescriptions/Index";
import PrescriptionsShow from "@/pages/Prescriptions/Show";
import PrescriptionsCreate from "@/pages/Prescriptions/Create";
import PrescriptionsEdit from "@/pages/Prescriptions/Edit";

function AppContent({ loggedIn, onLogin, user }) {
  const location = useLocation();
  const showSidebar = !["/login", "/register"].includes(location.pathname);
  const showHeader = !["/login", "/register"].includes(location.pathname);

  return (
    <>
      <SidebarProvider>
        {showSidebar && (
          <SideBar onLogin={onLogin} loggedIn={loggedIn} user={user} />
        )}
        <SidebarInset>
          {showHeader && <SiteHeader />}

          {/* Routes with conditional rendering: if loggedIn is true, render the component; otherwise, redirect to /login */}
          <Routes>
            <Route
              path="/"
              element={<Navigate to={loggedIn ? "/dashboard" : "/login"} />}
            />
            <Route
              path="/register"
              element={<Register onRegister={onLogin} />}
            />
            <Route
              path="/login"
              element={<LogIn onLogin={onLogin} loggedIn={loggedIn} />}
            />

            <Route
              path="/dashboard"
              element={
                loggedIn ? (
                  <Dashboard loggedIn={loggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/doctors"
              element={loggedIn ? <DoctorsIndex /> : <Navigate to="/login" />}
            />
            <Route
              path="/doctors/create"
              element={loggedIn ? <DoctorsCreate /> : <Navigate to="/login" />}
            />
            <Route
              path="/doctors/:id"
              element={
                loggedIn ? (
                  <DoctorsShow loggedIn={loggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/doctors/edit/:id"
              element={loggedIn ? <DoctorsEdit /> : <Navigate to="/login" />}
            />
            <Route
              path="/patients"
              element={loggedIn ? <PatientsIndex /> : <Navigate to="/login" />}
            />
            <Route
              path="/patients/create"
              element={loggedIn ? <PatientsCreate /> : <Navigate to="/login" />}
            />
            <Route
              path="/patients/:id"
              element={
                loggedIn ? (
                  <PatientsShow loggedIn={loggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/patients/edit/:id"
              element={loggedIn ? <PatientsEdit /> : <Navigate to="/login" />}
            />
            <Route
              path="/appointments"
              element={
                loggedIn ? <AppointmentsIndex /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/appointments/create"
              element={
                loggedIn ? <AppointmentsCreate /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/appointments/:id"
              element={
                loggedIn ? (
                  <AppointmentsShow loggedIn={loggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/appointments/edit/:id"
              element={
                loggedIn ? <AppointmentsEdit /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/diagnoses"
              element={loggedIn ? <DiagnosesIndex /> : <Navigate to="/login" />}
            />
            <Route
              path="/diagnoses/create"
              element={
                loggedIn ? <DiagnosesCreate /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/diagnoses/:id"
              element={
                loggedIn ? (
                  <DiagnosesShow loggedIn={loggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/diagnoses/edit/:id"
              element={loggedIn ? <DiagnosesEdit /> : <Navigate to="/login" />}
            />
            <Route
              path="/prescriptions"
              element={
                loggedIn ? <PrescriptionsIndex /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/prescriptions/create"
              element={
                loggedIn ? <PrescriptionsCreate /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/prescriptions/:id"
              element={
                loggedIn ? (
                  <PrescriptionsShow loggedIn={loggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/prescriptions/edit/:id"
              element={
                loggedIn ? <PrescriptionsEdit /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  const [user, setUser] = useState(null);

  // This useEffect decodes the JWT token to extract user info (name and email) and sets the user state.
  // If the token is invalid, it logs out the user and clears the token.
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          name: decoded.name || "User",
          email: decoded.email || "user@example.com",
        });
      } catch (error) {
        console.error("Invalid token:", error);
        setLoggedIn(false);
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [loggedIn]);

  // onLogin function handles login/logout: sets loggedIn state, stores/removes token in localStorage.
  const onLogin = (auth, token) => {
    setLoggedIn(auth);

    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <Router>
      <AppContent loggedIn={loggedIn} onLogin={onLogin} user={user} />
    </Router>
  );
}
