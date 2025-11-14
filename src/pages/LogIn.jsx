import LoginForm from "@/components/LoginForm";

export default function LogIn({loggedIn, onLogin}) {
    return (
        <>
            <h1>This is the Log In page</h1>
            <LoginForm onLogin={onLogin} loggedIn={loggedIn} />
        </>
    );
};