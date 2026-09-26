"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import Image from "next/image";
import Link from "next/link";

/* =========================================================
   CONSTANTS & NAVIGATION CONFIG
========================================================= */

const BOOKING_URL =
  "https://online.rapidlaundromat.lk";

const NAV_LINKS = [
  {
    href: "#services",
    label: "Services",
  },
  {
    href: "#signature-care",
    label: "Signature",
  },
  {
    href: "#why-rapid",
    label: "Why Rapid",
  },
  {
    href: "#locations",
    label: "Locations",
  },
  {
    href: "#people",
    label: "Our People",
  },
  {
    href: "#reviews",
    label: "Reviews",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

const SECTION_THEMES = {
  hero: "cinematic",
  trust: "white",
  services: "softBlue",
  "signature-care": "premium",
  "why-rapid": "white",
  process: "softBlue",
  locations: "white",
  people: "softBlue",
  reviews: "white",
  commercial: "royal",
  gallery: "softBlue",
  booking: "deepNavy",
  faq: "white",
  contact: "softBlue",
  footer: "veryDark",
};

/* =========================================================
   THEMES
========================================================= */

const THEMES = {
  cinematic: {
    nav:
      "border-white/[0.12] bg-[#001F5C]/[0.24] backdrop-blur-xl",

    scrolledNav:
      "border-white/[0.11] bg-[#001F5C]/[0.92] shadow-[0_14px_50px_rgba(0,15,55,.28)] backdrop-blur-2xl",

    logoText:
      "text-white",

    logoAccent:
      "text-[#41B6FF]",

    logoSubtext:
      "text-white/45",

    navText:
      "text-white/65",

    navHover:
      "hover:text-white",

    navActive:
      "text-white font-black",

    activeAccent:
      "bg-gradient-to-r from-[#41B6FF] via-[#0084E3] to-[#41B6FF]",

    hoverAccent:
      "bg-gradient-to-r from-transparent via-[#41B6FF] to-transparent",

    activeGlow:
      "bg-[#41B6FF]/70",

    menuButton:
      "border-white/15 bg-[#001F5C]/45 hover:bg-[#001F5C]/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,15,55,.22)]",

    menuIcon:
      "bg-white",

    cta:
      "bg-gradient-to-br from-[#0062CC] via-[#0084E3] to-[#41B6FF] text-white shadow-[0_8px_25px_rgba(0,132,227,.28)] hover:shadow-[0_12px_35px_rgba(65,182,255,.38)]",

    topLine:
      "bg-gradient-to-r from-transparent via-[#41B6FF]/55 to-transparent",

    mobileBackground:
      "bg-gradient-to-br from-[#000D27] via-[#001F5C] to-[#0062CC]",

    mobileAccent:
      "text-[#41B6FF]",

    mobileClose:
      "border-white/15 bg-white/[0.08]",

    mobileCta:
      "bg-gradient-to-br from-[#0062CC] via-[#0084E3] to-[#41B6FF] text-white",
  },

  white: {
    nav:
      "border-[#001F5C]/[0.07] bg-white/[0.91] shadow-[0_8px_35px_rgba(0,31,92,.055)] backdrop-blur-xl",

    scrolledNav:
      "border-[#001F5C]/[0.08] bg-white/[0.97] shadow-[0_14px_45px_rgba(0,31,92,.09)] backdrop-blur-2xl",

    logoText:
      "text-[#001F5C]",

    logoAccent:
      "text-[#0062CC]",

    logoSubtext:
      "text-[#001F5C]/35",

    navText:
      "text-[#001F5C]/60",

    navHover:
      "hover:text-[#001F5C]",

    navActive:
      "text-[#0062CC] font-black",

    activeAccent:
      "bg-gradient-to-r from-[#0062CC] via-[#0084E3] to-[#41B6FF]",

    hoverAccent:
      "bg-gradient-to-r from-transparent via-[#0062CC] to-transparent",

    activeGlow:
      "bg-[#0084E3]/35",

    menuButton:
      "border-[#001F5C]/10 bg-white/90 hover:bg-white shadow-[0_8px_30px_rgba(0,31,92,.12)] backdrop-blur-xl",

    menuIcon:
      "bg-[#001F5C]",

    cta:
      "bg-[#001F5C] text-white shadow-[0_7px_22px_rgba(0,31,92,.18)] hover:bg-[#0062CC] hover:shadow-[0_11px_30px_rgba(0,98,204,.27)]",

    topLine:
      "bg-gradient-to-r from-transparent via-[#0062CC]/20 to-transparent",

    mobileBackground:
      "bg-gradient-to-br from-[#001F5C] via-[#003D92] to-[#0084E3]",

    mobileAccent:
      "text-[#41B6FF]",

    mobileClose:
      "border-white/15 bg-white/[0.08]",

    mobileCta:
      "bg-gradient-to-r from-[#0062CC] to-[#0084E3] text-white",
  },

  softBlue: {
    nav:
      "border-[#0084E3]/[0.10] bg-[#F4F9FF]/[0.91] shadow-[0_8px_35px_rgba(0,98,204,.055)] backdrop-blur-xl",

    scrolledNav:
      "border-[#0084E3]/[0.11] bg-[#F7FBFF]/[0.97] shadow-[0_14px_45px_rgba(0,98,204,.085)] backdrop-blur-2xl",

    logoText:
      "text-[#001F5C]",

    logoAccent:
      "text-[#0084E3]",

    logoSubtext:
      "text-[#001F5C]/35",

    navText:
      "text-[#001F5C]/60",

    navHover:
      "hover:text-[#0062CC]",

    navActive:
      "text-[#0084E3] font-black",

    activeAccent:
      "bg-gradient-to-r from-[#0084E3] to-[#41B6FF]",

    hoverAccent:
      "bg-gradient-to-r from-transparent via-[#0084E3] to-transparent",

    activeGlow:
      "bg-[#41B6FF]/45",

    menuButton:
      "border-[#0084E3]/15 bg-white/90 hover:bg-white shadow-[0_8px_30px_rgba(0,98,204,.12)] backdrop-blur-xl",

    menuIcon:
      "bg-[#001F5C]",

    cta:
      "bg-gradient-to-r from-[#0062CC] to-[#0084E3] text-white shadow-[0_7px_22px_rgba(0,98,204,.20)] hover:shadow-[0_12px_32px_rgba(0,132,227,.28)]",

    topLine:
      "bg-gradient-to-r from-transparent via-[#41B6FF]/32 to-transparent",

    mobileBackground:
      "bg-gradient-to-br from-[#001F5C] via-[#0062CC] to-[#0084E3]",

    mobileAccent:
      "text-[#8CD5FF]",

    mobileClose:
      "border-white/15 bg-white/[0.08]",

    mobileCta:
      "bg-gradient-to-r from-[#0062CC] to-[#41B6FF] text-white",
  },

  premium: {
    nav:
      "border-[#41B6FF]/[0.16] bg-[#000F36]/[0.77] shadow-[0_12px_45px_rgba(0,15,54,.25)] backdrop-blur-2xl",

    scrolledNav:
      "border-[#41B6FF]/[0.18] bg-[#000F36]/[0.96] shadow-[0_16px_55px_rgba(0,10,40,.40)] backdrop-blur-2xl",

    logoText:
      "text-white",

    logoAccent:
      "text-[#8CD5FF]",

    logoSubtext:
      "text-white/40",

    navText:
      "text-white/65",

    navHover:
      "hover:text-[#8CD5FF]",

    navActive:
      "text-[#41B6FF] font-black",

    activeAccent:
      "bg-gradient-to-r from-[#0062CC] via-[#41B6FF] to-white",

    hoverAccent:
      "bg-gradient-to-r from-transparent via-[#41B6FF] to-transparent",

    activeGlow:
      "bg-[#41B6FF]/75",

    menuButton:
      "border-[#41B6FF]/20 bg-[#000F36]/75 hover:bg-[#000F36]/90 shadow-[0_8px_30px_rgba(0,15,54,.25)] backdrop-blur-xl",

    menuIcon:
      "bg-white",

    cta:
      "border border-[#41B6FF]/20 bg-[#41B6FF] text-[#001F5C] shadow-[0_8px_28px_rgba(65,182,255,.22)] hover:bg-white",

    topLine:
      "bg-gradient-to-r from-transparent via-[#8CD5FF]/60 to-transparent",

    mobileBackground:
      "bg-gradient-to-br from-[#000814] via-[#001F5C] to-[#004DAA]",

    mobileAccent:
      "text-[#41B6FF]",

    mobileClose:
      "border-[#41B6FF]/20 bg-[#41B6FF]/[0.07]",

    mobileCta:
      "bg-[#41B6FF] text-[#001F5C]",
  },

  royal: {
    nav:
      "border-white/[0.16] bg-[#0058C4]/[0.62] shadow-[0_10px_40px_rgba(0,57,145,.20)] backdrop-blur-2xl",

    scrolledNav:
      "border-white/[0.17] bg-[#0058C4]/[0.92] shadow-[0_15px_50px_rgba(0,45,120,.32)] backdrop-blur-2xl",

    logoText:
      "text-white",

    logoAccent:
      "text-[#BDE9FF]",

    logoSubtext:
      "text-white/48",

    navText:
      "text-white/75",

    navHover:
      "hover:text-white",

    navActive:
      "text-white font-black",

    activeAccent:
      "bg-gradient-to-r from-white via-[#BDE9FF] to-white",

    hoverAccent:
      "bg-gradient-to-r from-transparent via-white to-transparent",

    activeGlow:
      "bg-white/55",

    menuButton:
      "border-white/20 bg-[#0058C4]/70 hover:bg-[#0058C4]/90 shadow-[0_8px_30px_rgba(0,57,145,.18)] backdrop-blur-xl",

    menuIcon:
      "bg-white",

    cta:
      "bg-white text-[#0058C4] shadow-[0_9px_27px_rgba(0,31,92,.15)] hover:bg-[#E9F7FF]",

    topLine:
      "bg-gradient-to-r from-transparent via-white/45 to-transparent",

    mobileBackground:
      "bg-gradient-to-br from-[#004AA7] via-[#0062CC] to-[#0084E3]",

    mobileAccent:
      "text-white",

    mobileClose:
      "border-white/20 bg-white/[0.10]",

    mobileCta:
      "bg-white text-[#0058C4]",
  },

  deepNavy: {
    nav:
      "border-white/[0.11] bg-[#00163F]/[0.76] backdrop-blur-2xl",

    scrolledNav:
      "border-white/[0.12] bg-[#00163F]/[0.96] shadow-[0_16px_55px_rgba(0,10,40,.36)] backdrop-blur-2xl",

    logoText:
      "text-white",

    logoAccent:
      "text-[#41B6FF]",

    logoSubtext:
      "text-white/42",

    navText:
      "text-white/65",

    navHover:
      "hover:text-white",

    navActive:
      "text-[#41B6FF] font-black",

    activeAccent:
      "bg-gradient-to-r from-[#41B6FF] via-white to-[#41B6FF]",

    hoverAccent:
      "bg-gradient-to-r from-transparent via-[#41B6FF] to-transparent",

    activeGlow:
      "bg-[#41B6FF]/65",

    menuButton:
      "border-white/15 bg-[#00163F]/75 hover:bg-[#00163F]/90 shadow-[0_8px_30px_rgba(0,10,40,.22)] backdrop-blur-xl",

    menuIcon:
      "bg-white",

    cta:
      "bg-white text-[#001F5C] shadow-[0_8px_25px_rgba(0,0,0,.16)] hover:bg-[#DDF4FF]",

    topLine:
      "bg-gradient-to-r from-transparent via-[#41B6FF]/45 to-transparent",

    mobileBackground:
      "bg-gradient-to-br from-[#000D27] via-[#00163F] to-[#003A87]",

    mobileAccent:
      "text-[#41B6FF]",

    mobileClose:
      "border-white/15 bg-white/[0.07]",

    mobileCta:
      "bg-white text-[#001F5C]",
  },

  veryDark: {
    nav:
      "border-white/[0.08] bg-[#000D27]/[0.86] backdrop-blur-2xl",

    scrolledNav:
      "border-white/[0.09] bg-[#000816]/[0.97] shadow-[0_15px_55px_rgba(0,0,0,.35)] backdrop-blur-2xl",

    logoText:
      "text-white",

    logoAccent:
      "text-[#41B6FF]",

    logoSubtext:
      "text-white/35",

    navText:
      "text-white/55",

    navHover:
      "hover:text-white",

    navActive:
      "text-[#41B6FF] font-black",

    activeAccent:
      "bg-gradient-to-r from-[#0062CC] to-[#41B6FF]",

    hoverAccent:
      "bg-gradient-to-r from-transparent via-[#41B6FF] to-transparent",

    activeGlow:
      "bg-[#41B6FF]/55",

    menuButton:
      "border-white/10 bg-[#000D27]/80 hover:bg-[#000D27]/95 shadow-[0_8px_30px_rgba(0,0,0,.25)] backdrop-blur-xl",

    menuIcon:
      "bg-white",

    cta:
      "bg-white text-[#001F5C] hover:bg-[#DDF4FF]",

    topLine:
      "bg-gradient-to-r from-transparent via-[#41B6FF]/30 to-transparent",

    mobileBackground:
      "bg-gradient-to-br from-[#00030A] via-[#000D27] to-[#001F5C]",

    mobileAccent:
      "text-[#41B6FF]",

    mobileClose:
      "border-white/10 bg-white/[0.05]",

    mobileCta:
      "bg-white text-[#001F5C]",
  },
};

/* =========================================================
   COMPONENT
========================================================= */

export default function Navbar() {
  const [scrolled, setScrolled] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const [
    activeSection,
    setActiveSection,
  ] = useState("hero");

  const [
    navbarTheme,
    setNavbarTheme,
  ] = useState("cinematic");

  const themeTimeoutRef =
    useRef(null);

  const theme =
    THEMES[navbarTheme] ||
    THEMES.cinematic;

  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();

      setOpen(false);

      const targetId =
        href.replace("#", "");

      const targetElement =
        document.getElementById(
          targetId
        );

      if (!targetElement) {
        return;
      }

      const headerOffset = 90;

      const elementPosition =
        targetElement.getBoundingClientRect()
          .top;

      const offsetPosition =
        elementPosition +
        window.pageYOffset -
        headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(
        targetId
      );

      if (
        SECTION_THEMES[
          targetId
        ]
      ) {
        setNavbarTheme(
          SECTION_THEMES[
            targetId
          ]
        );
      }
    },
    []
  );

  /* =======================================================
     SCROLL & SECTION DETECTION
  ======================================================= */

  useEffect(() => {
    const sectionIds =
      Object.keys(
        SECTION_THEMES
      );

    let ticking = false;

    function onScrollOrResize() {
      setScrolled(
        window.scrollY > 40
      );

      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(
        () => {
          const detectionPoint =
            Math.min(
              160,
              window.innerHeight *
                0.22
            );

          let currentSection =
            "hero";

          for (
            const id
            of sectionIds
          ) {
            const section =
              document.getElementById(
                id
              );

            if (!section) {
              continue;
            }

            const rect =
              section.getBoundingClientRect();

            if (
              rect.top <=
                detectionPoint &&
              rect.bottom >
                detectionPoint
            ) {
              currentSection =
                id;

              break;
            }
          }

          const nextTheme =
            SECTION_THEMES[
              currentSection
            ] || "white";

          setActiveSection(
            currentSection
          );

          if (
            themeTimeoutRef.current
          ) {
            clearTimeout(
              themeTimeoutRef.current
            );
          }

          themeTimeoutRef.current =
            setTimeout(
              () => {
                setNavbarTheme(
                  nextTheme
                );
              },
              50
            );

          ticking = false;
        }
      );
    }

    onScrollOrResize();

    window.addEventListener(
      "scroll",
      onScrollOrResize,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      onScrollOrResize
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScrollOrResize
      );

      window.removeEventListener(
        "resize",
        onScrollOrResize
      );

      if (
        themeTimeoutRef.current
      ) {
        clearTimeout(
          themeTimeoutRef.current
        );
      }
    };
  }, []);

  /* =======================================================
     KEYBOARD + BODY LOCK
  ======================================================= */

  useEffect(() => {
    function handleKeyDown(e) {
      if (
        e.key === "Escape"
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.body.style.overflow =
        "hidden";

      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  /* =======================================================
     ACTIVE LINK
  ======================================================= */

  const isLinkActive = (
    href
  ) =>
    activeSection ===
    href.replace("#", "");

  return (
    <>
      {/* =====================================================
          MOBILE FLOATING HAMBURGER
      ===================================================== */}

      <div
        className={`
          fixed
          right-4
          z-50
          lg:hidden

          transition-all
          duration-500

          ${
            scrolled
              ? "top-3"
              : "top-4"
          }

          ${
            open
              ? "pointer-events-none opacity-0"
              : "pointer-events-auto opacity-100"
          }
        `}
      >
        <button
          type="button"
          onClick={() =>
            setOpen(true)
          }
          aria-label="Open navigation menu"
          aria-expanded={open}
          className={`
            flex
            h-12
            w-12

            items-center
            justify-center

            rounded-[15px]

            border

            transition-all
            duration-300
            ease-out

            active:scale-95

            ${theme.menuButton}
          `}
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`
                h-[2px]
                w-5

                rounded-full

                transition-all
                duration-500

                ${theme.menuIcon}
              `}
            />

            <span
              className="
                h-[2px]
                w-3

                self-end

                rounded-full

                bg-[#41B6FF]
              "
            />

            <span
              className={`
                h-[2px]
                w-5

                rounded-full

                transition-all
                duration-500

                ${theme.menuIcon}
              `}
            />
          </div>
        </button>
      </div>

      {/* =====================================================
          DESKTOP HEADER
      ===================================================== */}

      <header
        className="
          fixed
          inset-x-0
          top-0
          z-50

          hidden

          transition-all

          lg:block
        "
      >
        <div
          className={`
            mx-auto

            transition-all
            duration-500
            ease-out

            ${
              scrolled
                ? "max-w-[1420px] px-6 pt-3"
                : "max-w-[1500px] px-8 pt-5 xl:px-10"
            }
          `}
        >
          <nav
            aria-label="Main Navigation"
            className={`
              relative

              flex
              items-center
              justify-between

              rounded-[20px]

              border

              px-6
              xl:px-7

              transition-all
              duration-500
              ease-out

              ${
                scrolled
                  ? theme.scrolledNav
                  : theme.nav
              }
            `}
          >
            {/* TOP ACCENT */}

            <div
              aria-hidden="true"
              className={`
                pointer-events-none

                absolute
                inset-x-7
                top-0

                h-px

                transition-all
                duration-700

                ${theme.topLine}
              `}
            />

            {/* =================================================
                DESKTOP LOGO
            ================================================= */}

            <Link
              href="#hero"
              onClick={(e) =>
                handleNavClick(
                  e,
                  "#hero"
                )
              }
              className="
                group

                relative

                flex
                shrink-0
                items-center
                gap-3

                py-3

                focus:outline-none
              "
            >
              <div
                className="
                  relative

                  h-12
                  w-12

                  shrink-0
                  overflow-hidden

                  rounded-full

                  bg-white

                  shadow-[0_5px_20px_rgba(0,31,92,.18)]

                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  group-hover:scale-[1.06]
                  group-hover:shadow-[0_8px_25px_rgba(0,98,204,.22)]
                "
              >
                <Image
                  src="/images/logo.jpeg"
                  alt="Rapid Laundromat logo"
                  fill
                  priority
                  sizes="48px"
                  className="
                    object-cover

                    transition-transform
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    group-hover:scale-110
                  "
                />
              </div>

              <div>
                {/* BRAND NAME */}

                <div
                  className={`
                    flex
                    items-baseline

                    font-barlowCond

                    text-[1.25rem]
                    uppercase

                    leading-none

                    transition-colors
                    duration-500

                    ${theme.logoText}
                  `}
                >
                  <span
                    className="
                      inline-block

                      font-black
                      italic

                      tracking-[-0.8px]

                      transition-all
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:-translate-y-[1px]
                      group-hover:scale-[1.045]
                    "
                  >
                    Rapid
                  </span>

                  <span
                    className={`
                      ml-[6px]

                      font-black
                      not-italic

                      tracking-[0.4px]

                      transition-all
                      duration-500

                      ${theme.logoAccent}
                    `}
                  >
                    Laundromat
                  </span>
                </div>

                <div
                  className={`
                    mt-1

                    text-[.55rem]
                    font-bold
                    uppercase

                    tracking-[3px]

                    transition-colors
                    duration-500

                    ${theme.logoSubtext}
                  `}
                >
                  Premium Garment Care
                </div>
              </div>
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <div
              className="
                absolute
                left-1/2

                -translate-x-1/2
              "
            >
              <div
                className="
                  flex
                  items-center

                  gap-3.5
                  xl:gap-5
                  2xl:gap-7
                "
              >
                {NAV_LINKS.map(
                  (link) => {
                    const active =
                      isLinkActive(
                        link.href
                      );

                    return (
                      <a
                        key={
                          link.href
                        }
                        href={
                          link.href
                        }
                        onClick={(
                          e
                        ) =>
                          handleNavClick(
                            e,
                            link.href
                          )
                        }
                        className={`
                          group

                          relative

                          inline-flex
                          items-center
                          justify-center

                          origin-center

                          whitespace-nowrap

                          py-6

                          font-barlowCond

                          text-[0.72rem]
                          xl:text-[0.76rem]
                          2xl:text-[0.8rem]

                          font-bold
                          uppercase

                          tracking-[1.05px]
                          xl:tracking-[1.15px]

                          transition-all
                          duration-300

                          ease-[cubic-bezier(0.22,1,0.36,1)]

                          hover:-translate-y-[1px]
                          hover:scale-[1.055]

                          ${theme.navText}
                          ${theme.navHover}

                          ${
                            active
                              ? `${theme.navActive} scale-[1.025]`
                              : ""
                          }
                        `}
                      >
                        {link.label}

                        {/* HOVER / ACTIVE LINE */}

                        <span
                          aria-hidden="true"
                          className={`
                            pointer-events-none

                            absolute

                            -bottom-px
                            left-1/2

                            h-[2px]

                            -translate-x-1/2

                            rounded-full

                            transition-all
                            duration-500

                            ease-[cubic-bezier(0.22,1,0.36,1)]

                            ${
                              active
                                ? `w-full opacity-100 ${theme.activeAccent}`
                                : `w-0 opacity-0 group-hover:w-full group-hover:opacity-100 ${theme.hoverAccent}`
                            }
                          `}
                        />

                        {/* ACTIVE GLOW */}

                        {active && (
                          <span
                            aria-hidden="true"
                            className={`
                              pointer-events-none

                              absolute

                              -bottom-[4px]
                              left-1/2

                              h-[5px]
                              w-10

                              -translate-x-1/2

                              rounded-full

                              opacity-70

                              blur-[5px]

                              ${theme.activeGlow}
                            `}
                          />
                        )}
                      </a>
                    );
                  }
                )}
              </div>
            </div>

            {/* =================================================
                DESKTOP BOOKING CTA
            ================================================= */}

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group

                flex
                items-center
                gap-3

                rounded-xl

                px-5
                py-3

                font-barlowCond

                text-[.69rem]
                font-extrabold
                uppercase

                tracking-[1.1px]

                transition-all
                duration-300

                ease-[cubic-bezier(0.22,1,0.36,1)]

                hover:-translate-y-[2px]
                hover:scale-[1.025]

                ${theme.cta}
              `}
            >
              <span>
                Book Pickup
              </span>

              <span
                className="
                  flex

                  h-5
                  w-5

                  items-center
                  justify-center

                  rounded-full

                  bg-current/[0.12]

                  text-sm

                  transition-all
                  duration-300

                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </a>
          </nav>
        </div>
      </header>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`
          fixed
          inset-0

          z-[60]

          transition-all
          duration-500

          lg:hidden

          ${
            open
              ? "pointer-events-auto visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
      >
        {/* BACKDROP */}

        <div
          aria-hidden="true"
          onClick={() =>
            setOpen(false)
          }
          className="
            absolute
            inset-0

            bg-[#000D27]/80

            backdrop-blur-md

            transition-opacity
            duration-500
          "
        />

        {/* DRAWER */}

        <div
          className={`
            absolute

            inset-x-3
            bottom-3
            top-3

            flex
            flex-col

            overflow-hidden

            rounded-[30px]

            bg-white

            shadow-[0_30px_100px_rgba(0,31,92,.40)]

            transition-all
            duration-500

            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              open
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-8 scale-[.975] opacity-0"
            }
          `}
        >
          {/* =================================================
              MOBILE HEADER
          ================================================= */}

          <div
            className={`
              relative

              overflow-hidden

              px-7
              pb-9
              pt-6

              transition-colors
              duration-500

              ${theme.mobileBackground}
            `}
          >
            {/* DECORATIVE CIRCLE */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute

                -right-20
                -top-20

                h-60
                w-60

                rounded-full

                border
                border-white/10
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute

                -bottom-24
                -left-20

                h-48
                w-48

                rounded-full

                border
                border-white/[0.06]
              "
            />

            {/* MOBILE LOGO */}

            <div
              className="
                relative

                flex
                items-center
                justify-between
              "
            >
              <Link
                href="#hero"
                onClick={(e) =>
                  handleNavClick(
                    e,
                    "#hero"
                  )
                }
                className="
                  group

                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    relative

                    h-11
                    w-11

                    overflow-hidden

                    rounded-full

                    bg-white

                    shadow-lg

                    transition-transform
                    duration-500

                    group-hover:scale-105
                  "
                >
                  <Image
                    src="/images/logo.jpeg"
                    alt="Rapid Laundromat logo"
                    fill
                    sizes="44px"
                    className="
                      object-cover

                      transition-transform
                      duration-700

                      group-hover:scale-110
                    "
                  />
                </div>

                <div>
                  <div
                    className="
                      flex
                      items-baseline

                      font-barlowCond

                      text-[1.22rem]
                      uppercase

                      leading-none

                      text-white
                    "
                  >
                    <span
                      className="
                        font-black
                        italic

                        tracking-[-0.7px]

                        transition-transform
                        duration-300

                        group-hover:scale-[1.03]
                      "
                    >
                      Rapid
                    </span>

                    <span
                      className="
                        ml-[5px]

                        font-black
                        not-italic

                        tracking-[0.3px]

                        text-[#41B6FF]
                      "
                    >
                      Laundromat
                    </span>
                  </div>

                  <div
                    className="
                      mt-1

                      text-[.55rem]
                      font-bold
                      uppercase

                      tracking-[2px]

                      text-white/50
                    "
                  >
                    Premium Garment Care
                  </div>
                </div>
              </Link>

              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                aria-label="Close navigation menu"
                className={`
                  flex

                  h-10
                  w-10

                  items-center
                  justify-center

                  rounded-full

                  border

                  text-xl
                  text-white

                  transition-all
                  duration-300

                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:rotate-90
                  hover:scale-105

                  ${theme.mobileClose}
                `}
              >
                ×
              </button>
            </div>

            {/* MOBILE HEADLINE */}

            <div
              className="
                relative
                mt-9
              "
            >
              <p
                className={`
                  text-[.65rem]
                  font-bold
                  uppercase

                  tracking-[3px]

                  ${theme.mobileAccent}
                `}
              >
                {navbarTheme ===
                "premium"
                  ? "Signature Experience"
                  : navbarTheme ===
                      "royal"
                    ? "Business Solutions"
                    : navbarTheme ===
                        "deepNavy"
                      ? "Book Rapid"
                      : "Explore Rapid"}
              </p>

              <h2
                className="
                  mt-2

                  font-barlowCond

                  text-4xl
                  font-black
                  uppercase

                  leading-[.95]

                  tracking-[-1px]

                  text-white
                "
              >
                {navbarTheme ===
                "premium" ? (
                  <>
                    Premium Care.
                    <br />
                    Beyond Ordinary.
                  </>
                ) : navbarTheme ===
                  "royal" ? (
                  <>
                    Built for
                    <br />
                    Business.
                  </>
                ) : navbarTheme ===
                  "deepNavy" ? (
                  <>
                    Better Care.
                    <br />
                    Book Online.
                  </>
                ) : (
                  <>
                    Modern Care.
                    <br />
                    Made Effortless.
                  </>
                )}
              </h2>
            </div>
          </div>

          {/* =================================================
              MOBILE NAVIGATION
          ================================================= */}

          <div
            className="
              flex-1

              overflow-y-auto

              px-7
              py-4
            "
          >
            {NAV_LINKS.map(
              (
                link,
                index
              ) => {
                const active =
                  isLinkActive(
                    link.href
                  );

                return (
                  <a
                    key={
                      link.href
                    }
                    href={
                      link.href
                    }
                    onClick={(
                      e
                    ) =>
                      handleNavClick(
                        e,
                        link.href
                      )
                    }
                    className="
                      group

                      relative

                      flex
                      items-center

                      overflow-hidden

                      border-b
                      border-[#001F5C]/[0.07]

                      py-[15px]

                      transition-all
                      duration-300
                    "
                  >
                    {/* NUMBER */}

                    <span
                      className={`
                        w-9

                        text-[.62rem]
                        font-bold

                        tracking-[2px]

                        transition-all
                        duration-300

                        ${
                          active
                            ? "text-[#0062CC]"
                            : "text-[#0084E3]/75"
                        }
                      `}
                    >
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {/* LABEL */}

                    <span
                      className={`
                        origin-left

                        font-barlowCond

                        text-[1.62rem]
                        font-extrabold
                        uppercase

                        tracking-[0.35px]

                        transition-all
                        duration-300

                        ease-[cubic-bezier(0.22,1,0.36,1)]

                        group-hover:translate-x-1
                        group-hover:scale-[1.025]

                        ${
                          active
                            ? "text-[#0062CC]"
                            : "text-[#001F5C] group-hover:text-[#0084E3]"
                        }
                      `}
                    >
                      {link.label}
                    </span>

                    {/* ARROW */}

                    <span
                      className={`
                        ml-auto

                        text-xl

                        transition-all
                        duration-300

                        ease-[cubic-bezier(0.22,1,0.36,1)]

                        group-hover:translate-x-1
                        group-hover:scale-110

                        ${
                          active
                            ? "text-[#0084E3]"
                            : "text-[#001F5C]/20"
                        }
                      `}
                    >
                      →
                    </span>

                    {/* ACTIVE MOBILE INDICATOR */}

                    <span
                      className={`
                        absolute

                        bottom-0
                        left-9

                        h-[2px]

                        rounded-full

                        bg-gradient-to-r
                        from-[#0062CC]
                        via-[#0084E3]
                        to-[#41B6FF]

                        transition-all
                        duration-500

                        ${
                          active
                            ? "w-16 opacity-100"
                            : "w-0 opacity-0"
                        }
                      `}
                    />
                  </a>
                );
              }
            )}
          </div>

          {/* =================================================
              PEOPLE PROMO
          ================================================= */}

          <div
            className="
              px-6
              pb-3
            "
          >
            <a
              href="#people"
              onClick={(e) =>
                handleNavClick(
                  e,
                  "#people"
                )
              }
              className="
                group

                flex
                items-center
                justify-between

                rounded-[18px]

                bg-[#F4F9FF]

                px-5
                py-4

                transition-all
                duration-300

                ease-[cubic-bezier(0.22,1,0.36,1)]

                hover:-translate-y-[1px]
                hover:bg-[#EAF5FF]

                hover:shadow-[0_10px_30px_rgba(0,98,204,.08)]
              "
            >
              <div>
                <div
                  className="
                    text-[9px]
                    font-black
                    uppercase

                    tracking-[.15em]

                    text-[#0084E3]
                  "
                >
                  Behind Rapid
                </div>

                <div
                  className="
                    mt-1

                    font-barlowCond

                    text-[1rem]
                    font-black
                    uppercase

                    tracking-[.2px]

                    text-[#001F5C]
                  "
                >
                  Meet Our People
                </div>
              </div>

              <span
                className="
                  text-xl

                  text-[#0062CC]

                  transition-all
                  duration-300

                  group-hover:translate-x-1
                  group-hover:scale-110
                "
              >
                →
              </span>
            </a>
          </div>

          {/* =================================================
              MOBILE BOOKING CTA
          ================================================= */}

          <div
            className="
              border-t
              border-[#001F5C]/[0.06]

              bg-white

              p-6
            "
          >
            <a
              href={
                BOOKING_URL
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                setOpen(false)
              }
              className={`
                group

                flex
                items-center
                justify-between

                rounded-xl

                px-6
                py-4

                font-barlowCond

                text-[0.95rem]
                font-extrabold
                uppercase

                tracking-[1px]

                transition-all
                duration-300

                ease-[cubic-bezier(0.22,1,0.36,1)]

                hover:-translate-y-[2px]
                hover:scale-[1.01]

                ${theme.mobileCta}
              `}
            >
              <span>
                Book Your Pickup
              </span>

              <span
                className="
                  text-xl

                  transition-all
                  duration-300

                  group-hover:translate-x-1
                  group-hover:scale-110
                "
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}