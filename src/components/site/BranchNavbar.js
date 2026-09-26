"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Menu,
  Phone,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";


export default function BranchNavbar({
  branch,
}) {
  const [scrolled, setScrolled] =
    useState(false);

  const [open, setOpen] =
    useState(false);


  useEffect(() => {
    function handleScroll() {
      setScrolled(
        window.scrollY > 40
      );
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);


  useEffect(() => {
    document.body.style.overflow =
      open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);


  const links = [
    {
      href: "#about",
      label: "About",
    },
    {
      href: "#services",
      label: "Services",
    },
    {
      href: "#manager",
      label: "Manager",
    },
    {
      href: "#team",
      label: "Team",
    },
    {
      href: "#gallery",
      label: "Gallery",
    },
    {
      href: "#visit",
      label: "Visit",
    },
  ];


  return (
    <>
      <header
        className={`
          fixed
          left-1/2
          top-4
          z-50

          w-[calc(100%-2rem)]
          max-w-[1450px]

          -translate-x-1/2

          rounded-[22px]

          border

          transition-all
          duration-500

          ${
            scrolled
              ? `
                border-[#001F5C]/10
                bg-white/95
                shadow-[0_15px_50px_rgba(0,31,92,.10)]
                backdrop-blur-xl
              `
              : `
                border-white/15
                bg-[#001F5C]/35
                backdrop-blur-xl
              `
          }
        `}
      >

        <div
          className="
            flex
            h-[72px]
            items-center
            justify-between
            px-4
            sm:px-6
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <Link
              href="/#locations"
              className={`
                hidden
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                transition
                sm:flex

                ${
                  scrolled
                    ? `
                      border-[#001F5C]/10
                      text-[#001F5C]
                    `
                    : `
                      border-white/15
                      text-white
                    `
                }
              `}
            >
              <ArrowLeft
                size={15}
              />
            </Link>


            <Link
              href="/"
              className="
                flex
                items-center
                gap-3
              "
            >
              <Image
                src="/images/logo.jpeg"
                alt="Rapid Laundromat"
                width={42}
                height={42}
                priority
                className="
                  h-10
                  w-10
                  rounded-full
                  object-contain
                  shadow-lg
                "
              />


              <div>
                <div
                  className={`
                    text-[11px]
                    font-black
                    uppercase
                    tracking-[.08em]

                    ${
                      scrolled
                        ? "text-[#001F5C]"
                        : "text-white"
                    }
                  `}
                >
                  Rapid Laundromat
                </div>


                <div
                  className={`
                    mt-0.5
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[.14em]

                    ${
                      scrolled
                        ? "text-[#0084E3]"
                        : "text-[#8BD5FF]"
                    }
                  `}
                >
                  {branch.shortName ||
                    branch.name}
                </div>
              </div>
            </Link>

          </div>


          {/* DESKTOP NAV */}

          <nav
            className="
              hidden
              items-center
              gap-7
              lg:flex
            "
          >
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[.13em]
                  transition

                  ${
                    scrolled
                      ? `
                        text-[#001F5C]/55
                        hover:text-[#0062CC]
                      `
                      : `
                        text-white/65
                        hover:text-white
                      `
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>


          {/* RIGHT */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            {branch.phone && (
              <a
                href={`tel:${branch.phone}`}
                className="
                  hidden
                  h-10
                  items-center
                  gap-2
                  rounded-xl

                  bg-gradient-to-br
                  from-[#0062CC]
                  via-[#0084E3]
                  to-[#41B6FF]

                  px-4

                  text-[9px]
                  font-black
                  uppercase
                  tracking-[.12em]
                  text-white

                  shadow-[0_8px_25px_rgba(0,98,204,.20)]

                  sm:flex
                "
              >
                <Phone size={13} />
                Call Branch
              </a>
            )}


            <button
              type="button"
              onClick={() =>
                setOpen(true)
              }
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                lg:hidden

                ${
                  scrolled
                    ? `
                      border-[#001F5C]/10
                      text-[#001F5C]
                    `
                    : `
                      border-white/15
                      text-white
                    `
                }
              `}
            >
              <Menu size={17} />
            </button>

          </div>
        </div>
      </header>


      {/* MOBILE MENU */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-[#001F5C]
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/10
              px-6
              py-5
            "
          >

            <div>
              <div
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[.12em]
                  text-[#41B6FF]
                "
              >
                Rapid Laundromat
              </div>

              <div
                className="
                  mt-1
                  text-lg
                  font-black
                  text-white
                "
              >
                {branch.shortName ||
                  branch.name}
              </div>
            </div>


            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                text-white
              "
            >
              <X size={17} />
            </button>
          </div>


          <nav
            className="
              flex
              flex-col
              px-6
              py-8
            "
          >

            {links.map(
              (item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-5
                    border-b
                    border-white/[0.08]
                    py-5
                  "
                >

                  <span
                    className="
                      text-[9px]
                      font-black
                      text-[#41B6FF]
                    "
                  >
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </span>


                  <span
                    className="
                      text-xl
                      font-black
                      tracking-[-.04em]
                      text-white
                    "
                  >
                    {item.label}
                  </span>

                </a>
              )
            )}


            <Link
              href="/#locations"
              className="
                mt-8
                inline-flex
                h-12
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-white/15
                text-[10px]
                font-black
                uppercase
                tracking-[.12em]
                text-white
              "
            >
              <ArrowLeft size={14} />
              All Locations
            </Link>

          </nav>
        </div>
      )}
    </>
  );
}