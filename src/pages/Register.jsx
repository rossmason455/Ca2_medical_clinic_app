import RegisterForm from "@/components/RegisterForm";

export default function Register({ onRegister }) {
  return (
    <>
      <div className="dbBackground justify-content-center overflow-x-hidden min-h-screen flex">
        <div
          className="dbBackground justify-content-center overflow-x-hidden justify-center pl-220 pr-220 mt-40"
          style={{ minWidth: "99vw" }}
        >
          <RegisterForm onRegister={onRegister} />
        </div>
      </div>
    </>
  );
}
