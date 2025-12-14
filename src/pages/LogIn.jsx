import LoginForm from "@/components/LoginForm";

export default function LogIn({loggedIn, onLogin}) {
    return (
        <>



        <div className="dbBackground justify-content-center overflow-x-hidden min-h-screen flex">



    <div
      className="dbBackground justify-content-center overflow-x-hidden justify-center pl-180 pr-180 mt-40"
      style={{ minWidth: '99vw' }}
    >
 <LoginForm onLogin={onLogin} loggedIn={loggedIn} />
</div>
</div>

        </>
    );
};