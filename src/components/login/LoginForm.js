"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-navy px-4 py-8 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(145deg, #001050 0%, #002060 40%, #0040B0 75%, #0060D0 100%)",
      }}
    >
      {/* HERO STYLE GLOW */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,96,208,.35) 0%, transparent 70%)",
        }}
      />

      {/* Floating circles */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -left-20 top-[10%] h-87.5 w-87.5 rounded-full border border-[rgba(79,195,247,.15)] bg-[rgba(0,96,208,.08)] blur-sm"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -right-30 bottom-[5%] h-105 w-105 rounded-full border border-[rgba(79,195,247,.15)] bg-[rgba(0,64,160,.1)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-[30px] border border-[rgba(79,195,247,.18)] bg-[rgba(255,255,255,.06)] p-6 shadow-[0_40px_100px_rgba(0,16,80,.6)] backdrop-blur-2xl sm:p-10">
          
          {/* Logo Section */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="relative mb-5">
              <div className="absolute inset-0 rounded-full bg-[#4fc3f7]/30 blur-xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(79,195,247,.35)] bg-white/10 shadow-[0_15px_35px_rgba(0,16,80,.5)]">
                <Image
                  src="/images/logo.jpeg"
                  alt="Rapid Laundromat"
                  width={65}
                  height={65}
                  priority
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            <div className="mb-4 flex items-center gap-2 rounded-full border border-[rgba(79,195,247,.35)] bg-[rgba(0,96,208,.25)] px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#90caf9]">
              <Sparkles size={13} />
              Admin Studio
            </div>

            <h1 className="font-barlowCond text-3xl font-black uppercase tracking-[2px] text-white sm:text-4xl">
              Rapid Laundromat
            </h1>
            <p className="mt-2 text-xs text-[rgba(200,225,255,.8)] sm:text-sm">
              Manage your digital experience securely
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-[rgba(200,225,255,.7)]">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@rapidlaundromat.lk"
                  className="w-full rounded-2xl border border-[rgba(79,195,247,.25)] bg-[rgba(0,64,160,.25)] py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/30 transition focus:border-[#4fc3f7] focus:ring-4 focus:ring-[#4fc3f7]/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-[rgba(200,225,255,.7)]">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-[rgba(79,195,247,.25)] bg-[rgba(0,64,160,.25)] py-4 pl-12 pr-12 text-white outline-none placeholder:text-white/30 transition focus:border-[#4fc3f7] focus:ring-4 focus:ring-[#4fc3f7]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="group flex items-center justify-center gap-3 rounded-2xl bg-linear-to-br from-bright via-[#0090FF] to-[#4fc3f7] py-4 font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(0,96,208,.45)] transition-all hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-[rgba(79,195,247,.15)] bg-[rgba(0,64,160,.25)] px-4 py-3 text-xs text-[rgba(200,225,255,.7)]">
            <ShieldCheck size={15} className="text-[#4fc3f7]" />
            Authorized secure access
          </div>
        </div>
      </motion.div>
    </div>
  );
}