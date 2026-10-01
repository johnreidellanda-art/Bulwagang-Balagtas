import { LoginForm } from "@/components/auths/login-form";


export default function Home() {
  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center p-4 py-10">
      <LoginForm />
    </main>
  );
}