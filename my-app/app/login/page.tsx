import { LoginForm } from "@/components/auths/login-form";

export const metadata = {
  title: "Login | Online Reservation System",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 md:p-8">
      <LoginForm />
    </main>
  );
}