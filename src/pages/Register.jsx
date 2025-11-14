

import RegisterForm from "@/components/RegisterForm";



export default function Register({onLogin}) {
    return (
        <>
            <h1>Create Account</h1>
            <RegisterForm onRegister={(auth, token) => onLogin(auth, token)} />
        </>
    );
};