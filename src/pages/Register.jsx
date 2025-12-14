

import RegisterForm from "@/components/RegisterForm";



export default function Register({onLogin}) {
    return (
        <>
                  <div className="dbBackground justify-content-center overflow-x-hidden min-h-screen flex">
            
            
            
                <div
                  className="dbBackground justify-content-center overflow-x-hidden justify-center pl-180 pr-180 mt-40"
                  style={{ minWidth: '99vw' }}
                >
             <RegisterForm onRegister={(auth, token) => onLogin(auth, token)} />
            </div>
            </div>
            
        </>
    );
};