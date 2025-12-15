import LoginForm from "@/components/LoginForm";

export default function LogIn({loggedIn, onLogin}) {
    return (
        <>



        <div className="dbBackground justify-content-center overflow-x-hidden min-h-screen flex">



    <div
      className="dbBackground justify-content-center overflow-x-hidden justify-center pl-220 pr-220 mt-40 min-w-screen"
      
    >
 <LoginForm onLogin={onLogin} loggedIn={loggedIn} />
</div>
</div>

        </>
    );
};