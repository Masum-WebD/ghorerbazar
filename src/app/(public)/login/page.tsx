'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSuccess = () => {
    // If the AuthProvider already has the user, we can navigate.
    // However, context updates might be slightly delayed.
    // We will just push to dashboard and let the layout/middleware handle it.
    router.push("/dashboard/customer");
  };

  return (
    <main className="flex-1 bg-section-alt flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[calc(100vh-200px)]">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-2">
          Login & Register
        </h1>
        <p className="text-base text-slate-600 px-2">
          Log in or create your Siraj Tech account to manage orders, track deliveries, update your profile and shop Geotextiles, Concrete Block, Geo Bags & Garden Products.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-border">
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToRegister={() => router.push("/register")}
            onSwitchToForgot={() => router.push("/forgot-password")}
          />
        </div>
      </div>
    </main>
  );
}
