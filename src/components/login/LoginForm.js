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
  Loader2,
} from "lucide-react";

import { auth } from "@/lib/firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

/* ============================================================
   API
============================================================ */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";

/* ============================================================
   LOGIN FORM
============================================================ */

export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  /* ============================================================
     VERIFY & REDIRECT
  ============================================================ */

  const verifyAndRedirect = async () => {
    const verifyResponse = await fetch(
      `${API_BASE_URL}/api/auth/verify`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    );

    const verifyData =
      await verifyResponse.json();

    if (
      !verifyResponse.ok ||
      !verifyData.authenticated
    ) {
      throw new Error(
        verifyData.message ||
          "Login succeeded, but the secure session could not be verified."
      );
    }

    router.replace("/admin");
  };

  /* ============================================================
     INPUT CHANGE
  ============================================================ */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) {
      setError("");
    }
  };

  /* ============================================================
     EMAIL / PASSWORD LOGIN
  ============================================================ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || googleLoading) {
      return;
    }

    const email =
      form.email.trim().toLowerCase();

    const password =
      form.password;

    if (!email || !password) {
      setError(
        "Please enter both email and password."
      );

      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Invalid email or password."
        );

        setLoading(false);

        return;
      }

      await verifyAndRedirect();
    } catch (err) {
      console.error(
        "Login error:",
        err
      );

      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );

      setLoading(false);
    }
  };

  /* ============================================================
     GOOGLE SIGN IN
  ============================================================ */

  const handleGoogleSignIn =
    async () => {
      if (
        loading ||
        googleLoading
      ) {
        return;
      }

      setGoogleLoading(true);
      setError("");

      try {
        const provider =
          new GoogleAuthProvider();

        provider.setCustomParameters({
          prompt: "select_account",
        });

        const userCredential =
          await signInWithPopup(
            auth,
            provider
          );

        const idToken =
          await userCredential.user.getIdToken();

        const response =
          await fetch(
            `${API_BASE_URL}/api/auth/google`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              credentials:
                "include",

              body:
                JSON.stringify({
                  idToken,
                }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              "Unauthorized: Not an administrator."
          );

          setGoogleLoading(false);

          return;
        }

        await verifyAndRedirect();
      } catch (err) {
        console.error(
          "Google auth error:",
          err
        );

        if (
          err.code ===
          "auth/popup-closed-by-user"
        ) {
          setGoogleLoading(false);
          return;
        }

        if (
          err.code ===
          "auth/unauthorized-domain"
        ) {
          setError(
            "This domain is not authorized in Firebase Console."
          );
        } else {
          setError(
            err.message ||
              "Google sign-in failed. Please try again."
          );
        }

        setGoogleLoading(false);
      }
    };

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div
      className="
        relative flex min-h-dvh
        items-center justify-center
        overflow-x-hidden overflow-y-auto
        bg-navy

        px-4 py-5

        sm:px-6 sm:py-6

        lg:px-8 lg:py-8

        [@media(max-height:850px)]:py-4
        [@media(max-height:800px)]:py-3
        [@media(max-height:720px)]:py-2
      "
      style={{
        background:
          "linear-gradient(145deg, #001050 0%, #002060 40%, #0040B0 75%, #0060D0 100%)",
      }}
    >
      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute inset-0
        "
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,96,208,.35) 0%, transparent 70%)",
        }}
      />

      {/* ======================================================
          BACKGROUND ANIMATED BLOBS
      ====================================================== */}

      <motion.div
        animate={{
          y: [0, -25, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          pointer-events-none
          absolute
          -left-20
          top-[10%]

          h-80
          w-80

          rounded-full
          border
          border-[rgba(79,195,247,.15)]

          bg-[rgba(0,96,208,.08)]

          blur-sm
        "
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="
          pointer-events-none
          absolute
          -right-28
          bottom-[5%]

          h-96
          w-96

          rounded-full
          border
          border-[rgba(79,195,247,.15)]

          bg-[rgba(0,64,160,.1)]
        "
      />

      {/* ======================================================
          LOGIN WRAPPER
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          relative
          w-full
          max-w-md
        "
      >
        {/* ====================================================
            LOGIN CARD
        ==================================================== */}

        <div
          className="
            rounded-[30px]

            border
            border-[rgba(79,195,247,.18)]

            bg-[rgba(255,255,255,.06)]

            p-6

            shadow-[0_40px_100px_rgba(0,16,80,.6)]

            backdrop-blur-2xl

            sm:p-8
            lg:p-10

            [@media(max-height:850px)]:p-7
            [@media(max-height:800px)]:p-6
            [@media(max-height:720px)]:p-5
          "
        >
          {/* ==================================================
              BRAND / LOGO
          ================================================== */}

          <div
            className="
              mb-8
              flex
              flex-col
              items-center
              text-center

              [@media(max-height:850px)]:mb-6
              [@media(max-height:800px)]:mb-5
              [@media(max-height:720px)]:mb-4
            "
          >
            {/* Logo */}

            <div
              className="
                relative
                mb-5

                [@media(max-height:850px)]:mb-4
                [@media(max-height:800px)]:mb-3
              "
            >
              <div
                className="
                  absolute
                  inset-0

                  rounded-full

                  bg-[#4fc3f7]/30

                  blur-xl
                "
              />

              <div
                className="
                  relative
                  flex
                  h-20
                  w-20

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[rgba(79,195,247,.35)]

                  bg-white/10

                  shadow-[0_15px_35px_rgba(0,16,80,.5)]

                  [@media(max-height:850px)]:h-[72px]
                  [@media(max-height:850px)]:w-[72px]

                  [@media(max-height:800px)]:h-16
                  [@media(max-height:800px)]:w-16

                  [@media(max-height:720px)]:h-[58px]
                  [@media(max-height:720px)]:w-[58px]
                "
              >
                <Image
                  src="/images/logo.jpeg"
                  alt="Rapid Laundromat"
                  width={65}
                  height={65}
                  priority
                  className="
                    h-[65px]
                    w-[65px]

                    rounded-full
                    object-cover

                    [@media(max-height:850px)]:h-[58px]
                    [@media(max-height:850px)]:w-[58px]

                    [@media(max-height:800px)]:h-[52px]
                    [@media(max-height:800px)]:w-[52px]

                    [@media(max-height:720px)]:h-[48px]
                    [@media(max-height:720px)]:w-[48px]
                  "
                />
              </div>
            </div>

            {/* Admin badge */}

            <div
              className="
                mb-4
                flex
                items-center
                gap-2

                rounded-full

                border
                border-[rgba(79,195,247,.35)]

                bg-[rgba(0,96,208,.25)]

                px-4
                py-2

                text-[10px]
                font-black
                uppercase
                tracking-[2px]

                text-[#90caf9]

                [@media(max-height:850px)]:mb-3
                [@media(max-height:850px)]:py-1.5

                [@media(max-height:720px)]:mb-2
              "
            >
              <Sparkles size={13} />

              Admin Studio
            </div>

            {/* Heading */}

            <h1
              className="
                font-barlowCond

                text-3xl
                font-black
                uppercase

                tracking-[2px]

                text-white

                sm:text-4xl

                [@media(max-height:850px)]:text-3xl
                [@media(max-height:720px)]:text-2xl
              "
            >
              Rapid Laundromat
            </h1>

            {/* Description */}

            <p
              className="
                mt-2

                text-xs
                text-[rgba(200,225,255,.8)]

                sm:text-sm

                [@media(max-height:800px)]:mt-1
                [@media(max-height:800px)]:text-xs
              "
            >
              Manage your digital experience securely
            </p>
          </div>

          {/* ==================================================
              GOOGLE SIGN IN
          ================================================== */}

          <button
            type="button"
            onClick={
              handleGoogleSignIn
            }
            disabled={
              loading ||
              googleLoading
            }
            className="
              flex
              w-full

              items-center
              justify-center

              gap-3

              rounded-2xl

              border
              border-white/20

              bg-white/10

              py-3.5

              text-sm
              font-semibold

              text-white

              shadow-sm

              backdrop-blur-md

              transition

              hover:bg-white/20

              active:scale-[0.99]

              disabled:cursor-not-allowed
              disabled:opacity-50

              [@media(max-height:800px)]:py-3
              [@media(max-height:720px)]:py-2.5
            "
          >
            {googleLoading ? (
              <Loader2
                size={18}
                className="
                  animate-spin
                  text-[#4fc3f7]
                "
              />
            ) : (
              <svg
                className="
                  h-5
                  w-5
                "
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />

                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />

                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}

            Sign in with Google
          </button>

          {/* ==================================================
              DIVIDER
          ================================================== */}

          <div
            className="
              relative

              my-6

              flex
              items-center
              justify-center

              [@media(max-height:850px)]:my-5
              [@media(max-height:800px)]:my-4
              [@media(max-height:720px)]:my-3
            "
          >
            <div
              className="
                w-full
                border-t
                border-white/10
              "
            />

            <span
              className="
                absolute

                bg-[#082057]

                px-3

                text-[11px]
                font-bold
                uppercase
                tracking-widest

                text-[rgba(200,225,255,.5)]
              "
            >
              Or with email
            </span>
          </div>

          {/* ==================================================
              LOGIN FORM
          ================================================== */}

          <form
            onSubmit={
              handleSubmit
            }
            className="
              flex
              flex-col

              gap-5

              [@media(max-height:850px)]:gap-4
              [@media(max-height:800px)]:gap-3.5
              [@media(max-height:720px)]:gap-3
            "
          >
            {/* ================================================
                EMAIL
            ================================================ */}

            <div>
              <label
                className="
                  mb-2
                  block

                  text-xs
                  font-bold
                  uppercase

                  tracking-[1.5px]

                  text-[rgba(200,225,255,.7)]

                  [@media(max-height:800px)]:mb-1
                "
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-white/40
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="username"
                  disabled={
                    loading ||
                    googleLoading
                  }
                  placeholder="admin@rapidlaundromat.lk"
                  className="
                    w-full

                    rounded-2xl

                    border
                    border-[rgba(79,195,247,.25)]

                    bg-[rgba(0,64,160,.25)]

                    py-4
                    pl-12
                    pr-4

                    text-white

                    outline-none

                    placeholder:text-white/30

                    transition

                    focus:border-[#4fc3f7]

                    focus:ring-4
                    focus:ring-[#4fc3f7]/20

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    [@media(max-height:850px)]:py-3.5
                    [@media(max-height:800px)]:py-3
                    [@media(max-height:720px)]:py-2.5
                  "
                />
              </div>
            </div>

            {/* ================================================
                PASSWORD
            ================================================ */}

            <div>
              <label
                className="
                  mb-2
                  block

                  text-xs
                  font-bold
                  uppercase

                  tracking-[1.5px]

                  text-[rgba(200,225,255,.7)]

                  [@media(max-height:800px)]:mb-1
                "
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-white/40
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={
                    form.password
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="current-password"
                  disabled={
                    loading ||
                    googleLoading
                  }
                  placeholder="••••••••"
                  className="
                    w-full

                    rounded-2xl

                    border
                    border-[rgba(79,195,247,.25)]

                    bg-[rgba(0,64,160,.25)]

                    py-4
                    pl-12
                    pr-12

                    text-white

                    outline-none

                    placeholder:text-white/30

                    transition

                    focus:border-[#4fc3f7]

                    focus:ring-4
                    focus:ring-[#4fc3f7]/20

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    [@media(max-height:850px)]:py-3.5
                    [@media(max-height:800px)]:py-3
                    [@media(max-height:720px)]:py-2.5
                  "
                />

                {/* Password toggle */}

                <button
                  type="button"
                  disabled={
                    loading ||
                    googleLoading
                  }
                  onClick={() =>
                    setShowPassword(
                      (prev) =>
                        !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute

                    right-4
                    top-1/2

                    -translate-y-1/2

                    text-white/40

                    transition

                    hover:text-white

                    disabled:opacity-40
                  "
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                    />
                  ) : (
                    <Eye
                      size={18}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* ================================================
                ERROR
            ================================================ */}

            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  rounded-xl

                  border
                  border-red-400/30

                  bg-red-500/10

                  px-4
                  py-3

                  text-sm
                  text-red-200

                  [@media(max-height:800px)]:py-2
                  [@media(max-height:800px)]:text-xs
                "
              >
                {error}
              </motion.div>
            )}

            {/* ================================================
                SUBMIT
            ================================================ */}

            <button
              type="submit"
              disabled={
                loading ||
                googleLoading
              }
              className="
                group

                flex
                items-center
                justify-center

                gap-3

                rounded-2xl

                bg-gradient-to-br
                from-[#0050d0]
                via-[#0090FF]
                to-[#4fc3f7]

                py-4

                font-black
                uppercase
                tracking-widest

                text-white

                shadow-[0_10px_30px_rgba(0,96,208,.45)]

                transition-all

                hover:-translate-y-1

                disabled:cursor-not-allowed
                disabled:opacity-60

                [@media(max-height:850px)]:py-3.5
                [@media(max-height:800px)]:py-3
                [@media(max-height:720px)]:py-2.5
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Authenticating...
                </>
              ) : (
                <>
                  Sign In

                  <ArrowRight
                    size={18}
                    className="
                      transition
                      group-hover:translate-x-1
                    "
                  />
                </>
              )}
            </button>
          </form>

          {/* ==================================================
              SECURITY FOOTER
          ================================================== */}

          <div
            className="
              mt-7

              flex
              items-center
              justify-center

              gap-2

              rounded-xl

              border
              border-[rgba(79,195,247,.15)]

              bg-[rgba(0,64,160,.25)]

              px-4
              py-3

              text-xs

              text-[rgba(200,225,255,.7)]

              [@media(max-height:850px)]:mt-5

              [@media(max-height:800px)]:mt-4
              [@media(max-height:800px)]:py-2.5

              [@media(max-height:720px)]:mt-3
              [@media(max-height:720px)]:py-2
            "
          >
            <ShieldCheck
              size={15}
              className="text-[#4fc3f7]"
            />

            Authorized secure access
          </div>
        </div>
      </motion.div>
    </div>
  );
}