import LoginForm from "@/components/login/LoginForm";

export const metadata = {
  title: "Admin Login | Rapid Laundromat",
  description:
    "Secure administrator access portal for Rapid Laundromat website management.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};


export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh">
      <LoginForm />
    </main>
  );
}