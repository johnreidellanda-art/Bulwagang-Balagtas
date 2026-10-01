import { Metadata } from "next";
import { RegisterForm } from "@/components/auths/register-form";

export const metadata: Metadata = {
  title: "Create Account | Bulwagang Balagtas",
};

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-svh items-center justify-center bg-base-300 p-4">
      <div className="absolute top-4 right-4">
      </div>
      <RegisterForm />
    </div>
  );
}