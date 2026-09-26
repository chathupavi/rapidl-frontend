"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";


const LINKS = [
  {
    href:
      "/people/leadership",

    label:
      "Leadership",
  },

  {
    href:
      "/people/managers",

    label:
      "Managers",
  },

  {
    href:
      "/people/team",

    label:
      "Our Team",
  },
];


export default function PeopleNavbar({
  dark = false,
}) {
  const [
    scrolled,
    setScrolled,
  ] =
    useState(false);


  const [
    open,
    setOpen,
  ] =
    useState(false);


  useEffect(() => {
    function handleScroll() {
      setScrolled(
        window.scrollY >
          35
      );
    }


    handleScroll();


    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive:
          true,
      }
    );


    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);


  useEffect(() => {
    document.body.style.overflow =
      open
        ? "hidden"
        : "";


    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    open,
  ]);


  const solid =
    scrolled ||
    !dark;


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
            solid
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

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <Link
              href="/#people"

              className={`
                hidden
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                sm:flex

                ${
                  solid
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
                      solid
                        ? "text-[#001F5C]"
                        : "text-white"
                    }
                  `}
                >
                  Rapid Laundromat
                </div>


                <div
                  className="
                    mt-0.5
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[.14em]
                    text-[#0084E3]
                  "
                >
                  Our People
                </div>

              </div>

            </Link>

          </div>


          <nav
            className="
              hidden
              items-center
              gap-8
              lg:flex
            "
          >

            {LINKS.map(
              (
                item
              ) => (

                <Link
                  key={
                    item.href
                  }

                  href={
                    item.href
                  }

                  className={`
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[.13em]
                    transition

                    ${
                      solid
                        ? `
                          text-[#001F5C]/55
                          hover:text-[#0062CC]
                        `
                        : `
                          text-white/60
                          hover:text-white
                        `
                    }
                  `}
                >
                  {
                    item.label
                  }
                </Link>

              )
            )}

          </nav>


          <button
            type="button"

            onClick={() =>
              setOpen(
                true
              )
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
                solid
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
            <Menu
              size={17}
            />
          </button>

        </div>

      </header>


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

            <div
              className="
                text-lg
                font-black
                text-white
              "
            >
              Our People
            </div>


            <button
              type="button"

              onClick={() =>
                setOpen(
                  false
                )
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
              <X
                size={17}
              />
            </button>

          </div>


          <div
            className="
              px-6
              py-7
            "
          >

            {LINKS.map(
              (
                item,
                index
              ) => (

                <Link
                  key={
                    item.href
                  }

                  href={
                    item.href
                  }

                  onClick={() =>
                    setOpen(
                      false
                    )
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
                      index +
                        1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>


                  <span
                    className="
                      text-xl
                      font-black
                      text-white
                    "
                  >
                    {
                      item.label
                    }
                  </span>

                </Link>

              )
            )}

          </div>

        </div>

      )}

    </>
  );
}