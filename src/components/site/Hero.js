"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   RAPID LAUNDROMAT — PERFORMANCE-FIRST HERO

   Goals
   - Desktop: cinematic background video
   - Mobile/tablet: poster only, zero video decoding
   - No Framer Motion in the hero
   - No cursor-tracking springs
   - No per-character React animation
   - No large animated blur layers
   - Video pauses outside the viewport / hidden tab
============================================================ */

function HighlightedHeading({ text = "", highlight = "" }) {
  if (!text) return null;
  if (!highlight) return text;

  const source = text.toLocaleLowerCase();
  const target = highlight.trim().toLocaleLowerCase();
  const start = source.indexOf(target);

  if (start === -1) return text;

  const end = start + highlight.trim().length;

  return (
    <>
      {text.slice(0, start)}
      <span className="hero-highlight">{text.slice(start, end)}</span>
      {text.slice(end)}
    </>
  );
}

function HeroButton({ button, onAnchorClick }) {
  const isContact = button.style === "whatsapp";
  const href = isContact ? "#contact" : button.href || "#";

  const styleClass =
    button.style === "primary"
      ? "hero-btn-primary"
      : isContact
        ? "hero-btn-contact"
        : "hero-btn-secondary";

  return (
    <a
      href={href}
      onClick={(event) => onAnchorClick(event, href)}
      className={`hero-btn ${styleClass}`}
    >
      {button.icon ? (
        <span className="hero-btn-icon" aria-hidden="true">
          {button.icon}
        </span>
      ) : null}

      <span>{isContact ? "Get in Touch" : button.label}</span>

      <span className="hero-btn-arrow" aria-hidden="true">
        {isContact ? "↓" : button.style === "primary" ? "→" : ""}
      </span>
    </a>
  );
}

export default function Hero({ data = {} }) {
  const {
    logo = "/images/logo.jpeg",
    videoSrc = "/videos/water-flow-optimized.mp4",
    videoPoster = "/images/hero-poster.webp",
    videoSpeed = 0.65,
    badge,
    heading,
    headingHighlight,
    subheading,
    infoTags = [],
    buttons = [],
  } = data;

  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const [renderVideo, setRenderVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  /* ==========================================================
     DESKTOP-ONLY VIDEO MOUNT

     The poster is painted first for fast LCP.
     The video element does not even exist on smaller screens,
     so mobile devices do not download/decode the background video.
  ========================================================== */
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    let idleId = null;
    let timerId = null;

    const cancelScheduledMount = () => {
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timerId !== null) {
        window.clearTimeout(timerId);
      }

      idleId = null;
      timerId = null;
    };

    const updateVideoMode = () => {
      cancelScheduledMount();

      if (!desktopQuery.matches) {
        setRenderVideo(false);
        setVideoReady(false);
        return;
      }

      // Let the logo/text/poster win the first paint and LCP race.
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(
          () => setRenderVideo(true),
          { timeout: 650 },
        );
      } else {
        timerId = window.setTimeout(() => setRenderVideo(true), 140);
      }
    };

    updateVideoMode();
    desktopQuery.addEventListener?.("change", updateVideoMode);

    return () => {
      cancelScheduledMount();
      desktopQuery.removeEventListener?.("change", updateVideoMode);
    };
  }, []);

  /* ==========================================================
     PLAYBACK CONTROL
     - slower cinematic playback
     - pause when hero leaves viewport
     - pause when browser tab is hidden
  ========================================================== */
  useEffect(() => {
    if (!renderVideo) return undefined;

    const video = videoRef.current;
    const hero = heroRef.current;

    if (!video || !hero) return undefined;

    const speed = Math.max(0.35, Math.min(1, Number(videoSpeed) || 0.65));
    video.playbackRate = speed;

    let heroVisible = true;

    const syncPlayback = () => {
      const pageVisible = document.visibilityState === "visible";

      if (heroVisible && pageVisible) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        syncPlayback();
      },
      {
        threshold: 0.08,
      },
    );

    const onVisibilityChange = () => syncPlayback();

    observer.observe(hero);
    document.addEventListener("visibilitychange", onVisibilityChange);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, [renderVideo, videoSpeed]);

  function handleAnchorClick(event, href) {
    if (!href?.startsWith("#") || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <section ref={heroRef} id="hero" className="rapid-hero">
      {/* =====================================================
          FAST POSTER / MOBILE BACKGROUND
          Always available instantly. Next/Image optimizes it.
      ===================================================== */}
      <div className="hero-media" aria-hidden="true">
        <Image
          src={videoPoster}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={72}
          className="hero-poster"
        />

        {/* Desktop only: this node is not mounted on mobile. */}
        {renderVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={videoPoster}
            disablePictureInPicture
            onCanPlay={() => setVideoReady(true)}
            className={`hero-video ${videoReady ? "hero-video-ready" : ""}`}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>

      {/* One static overlay instead of several animated blur layers. */}
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-content">
        {/* Brand medallion */}
        <div className="hero-logo-wrap hero-enter hero-enter-1">
          <div className="hero-logo-ring" aria-hidden="true" />
          <div className="hero-logo-shell">
            <div className="hero-logo-inner">
              <Image
                src={logo}
                alt="Rapid Laundromat"
                fill
                priority
                sizes="(max-width: 640px) 144px, 190px"
                className="hero-logo-image"
              />
            </div>
          </div>
        </div>

        {badge ? (
          <div className="hero-badge hero-enter hero-enter-2">
            <span className="hero-badge-dot" aria-hidden="true" />
            {badge}
          </div>
        ) : null}

        <h1 className="hero-heading hero-enter hero-enter-2">
          <HighlightedHeading text={heading} highlight={headingHighlight} />
        </h1>

        {subheading ? (
          <p className="hero-subheading hero-enter hero-enter-3">
            {subheading}
          </p>
        ) : null}

        {infoTags.length > 0 ? (
          <div className="hero-tags hero-enter hero-enter-3">
            {infoTags.slice(0, 3).map((tag, index) => (
              <span className="hero-tag" key={`${tag.text || "tag"}-${index}`}>
                <span aria-hidden="true">{tag.icon || "•"}</span>
                <span>{tag.text}</span>
              </span>
            ))}
          </div>
        ) : null}

        {buttons.length > 0 ? (
          <div className="hero-actions hero-enter hero-enter-4">
            {buttons.map((button, index) => (
              <HeroButton
                key={`${button.label || "button"}-${index}`}
                button={button}
                onAnchorClick={handleAnchorClick}
              />
            ))}
          </div>
        ) : null}

        <div className="hero-signature hero-enter hero-enter-4">
          Fresh • Fast • Effortless
        </div>
      </div>

      <a
        href="#services"
        onClick={(event) => handleAnchorClick(event, "#services")}
        className="hero-scroll"
        aria-label="Explore our services"
      >
        <span className="hero-scroll-label">Explore</span>
        <span className="hero-scroll-track" aria-hidden="true">
          <span className="hero-scroll-dot" />
        </span>
      </a>

      <style jsx>{`
        .rapid-hero {
          position: relative;
          display: flex;
          min-height: 100svh;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          isolation: isolate;
          background: #001f5c;
          padding: 88px 16px 28px;
          color: white;
          text-align: center;
          contain: paint;
        }

        .hero-media,
        .hero-overlay,
        .hero-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hero-media {
          z-index: -4;
          overflow: hidden;
          background: #001f5c;
        }

        :global(.hero-poster),
        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        :global(.hero-poster) {
          filter: brightness(0.74) saturate(0.84) contrast(1.05);
        }

        .hero-video {
          position: absolute;
          inset: 0;
          opacity: 0;
          filter: brightness(0.74) saturate(0.84) contrast(1.05);
          transition: opacity 420ms ease;
          will-change: opacity;
        }

        .hero-video-ready {
          opacity: 1;
        }

        .hero-overlay {
          z-index: -3;
          background:
            linear-gradient(
              142deg,
              rgba(0, 31, 92, 0.83) 0%,
              rgba(0, 31, 92, 0.6) 38%,
              rgba(0, 98, 204, 0.3) 72%,
              rgba(0, 132, 227, 0.13) 100%
            );
        }

        .hero-vignette {
          z-index: -2;
          background:
            radial-gradient(
              ellipse 60% 53% at 50% 50%,
              rgba(0, 31, 92, 0.08) 0%,
              rgba(0, 31, 92, 0.12) 45%,
              rgba(0, 20, 64, 0.46) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 31, 92, 0.34) 0%,
              transparent 28%,
              transparent 68%,
              rgba(0, 20, 64, 0.62) 100%
            );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          width: min(100%, 1240px);
          flex-direction: column;
          align-items: center;
          margin-inline: auto;
        }

        .hero-logo-wrap {
          position: relative;
          display: grid;
          width: clamp(8.6rem, 18vh, 11.8rem);
          height: clamp(8.6rem, 18vh, 11.8rem);
          place-items: center;
          margin-top: clamp(-1.2rem, -1vh, -0.45rem);
          margin-bottom: clamp(0.45rem, 1vh, 0.7rem);
        }

        .hero-logo-ring {
          position: absolute;
          inset: -8px;
          border: 1px solid rgba(65, 182, 255, 0.42);
          border-radius: 999px;
          box-shadow:
            0 0 0 8px rgba(255, 255, 255, 0.04),
            0 0 40px rgba(65, 182, 255, 0.12);
        }

        .hero-logo-shell {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          background: rgba(0, 31, 92, 0.68);
          box-shadow:
            0 18px 52px rgba(0, 20, 64, 0.42),
            inset 0 1px rgba(255, 255, 255, 0.08);
        }

        .hero-logo-shell::before {
          content: "";
          position: absolute;
          z-index: 1;
          top: 8%;
          left: 16%;
          width: 68%;
          height: 22%;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
        }

        .hero-logo-inner {
          position: absolute;
          z-index: 2;
          inset: 9.5%;
        }

        :global(.hero-logo-image) {
          border-radius: 999px;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.24));
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: clamp(0.62rem, 1.2vh, 0.86rem);
          border: 1px solid rgba(65, 182, 255, 0.3);
          border-radius: 999px;
          background: rgba(0, 65, 148, 0.5);
          padding: 0.39rem 0.95rem;
          font-family: var(--font-barlow-condensed, inherit);
          font-size: clamp(0.59rem, 0.8vw, 0.7rem);
          font-weight: 800;
          letter-spacing: 0.17rem;
          line-height: 1;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
        }

        .hero-badge-dot {
          width: 6px;
          height: 6px;
          flex: 0 0 auto;
          border-radius: 999px;
          background: #41b6ff;
          box-shadow: 0 0 10px rgba(65, 182, 255, 0.9);
        }

        .hero-heading {
          width: 100%;
          max-width: 1080px;
          margin: 0;
          font-family: var(--font-barlow-condensed, inherit);
          font-size: clamp(2.5rem, min(5.25vw, 6.5vh), 5.35rem);
          font-weight: 900;
          letter-spacing: clamp(0.7px, 0.13vw, 2px);
          line-height: 0.93;
          text-transform: uppercase;
          text-wrap: balance;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }

        :global(.hero-highlight) {
          background: linear-gradient(90deg, #41b6ff, #55c1ff 48%, #ffffff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-subheading {
          max-width: 720px;
          margin: clamp(0.55rem, 1vh, 0.8rem) auto 0;
          font-size: clamp(0.82rem, min(1.12vw, 1.55vh), 1.05rem);
          font-weight: 500;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.74);
          text-wrap: balance;
        }

        .hero-tags {
          display: flex;
          max-width: 950px;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: clamp(0.55rem, 1vh, 0.76rem);
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(65, 182, 255, 0.2);
          border-radius: 999px;
          background: rgba(0, 31, 92, 0.58);
          padding: 0.34rem 0.82rem;
          font-size: clamp(0.62rem, 0.8vw, 0.72rem);
          font-weight: 650;
          color: rgba(255, 255, 255, 0.84);
        }

        .hero-actions {
          display: grid;
          width: min(100%, 430px);
          grid-template-columns: 1fr;
          gap: 10px;
          margin-top: clamp(0.78rem, 1.35vh, 1rem);
        }

        :global(.hero-btn) {
          position: relative;
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          overflow: hidden;
          border-radius: 12px;
          padding: 0.84rem 1.5rem;
          font-family: var(--font-barlow-condensed, inherit);
          font-size: 0.82rem;
          font-weight: 900;
          letter-spacing: 1px;
          line-height: 1;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background-color 180ms ease,
            box-shadow 180ms ease;
          transform: translateZ(0);
        }

        :global(.hero-btn:hover) {
          transform: translateY(-2px);
        }

        :global(.hero-btn:focus-visible) {
          outline: 3px solid rgba(65, 182, 255, 0.45);
          outline-offset: 3px;
        }

        :global(.hero-btn-primary) {
          border: 1px solid rgba(65, 182, 255, 0.34);
          background: linear-gradient(135deg, #0062cc, #0084e3 62%, #41b6ff);
          color: white;
          box-shadow: 0 10px 26px rgba(0, 98, 204, 0.32);
        }

        :global(.hero-btn-primary:hover) {
          box-shadow: 0 14px 34px rgba(0, 132, 227, 0.38);
        }

        :global(.hero-btn-secondary),
        :global(.hero-btn-contact) {
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(0, 31, 92, 0.62);
          color: white;
          box-shadow: inset 0 1px rgba(255, 255, 255, 0.06);
        }

        :global(.hero-btn-secondary:hover),
        :global(.hero-btn-contact:hover) {
          border-color: rgba(65, 182, 255, 0.52);
          background: rgba(0, 98, 204, 0.46);
        }

        :global(.hero-btn-icon),
        :global(.hero-btn-arrow) {
          display: inline-grid;
          place-items: center;
        }

        .hero-signature {
          display: none;
          margin-top: clamp(0.5rem, 0.9vh, 0.7rem);
          font-family: var(--font-barlow-condensed, inherit);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.28);
        }

        .hero-scroll {
          position: absolute;
          z-index: 4;
          bottom: 18px;
          left: 50%;
          display: none;
          flex-direction: column;
          align-items: center;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.46);
          text-decoration: none;
        }

        .hero-scroll-label {
          margin-bottom: 8px;
          font-family: var(--font-barlow-condensed, inherit);
          font-size: 0.56rem;
          font-weight: 900;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .hero-scroll-track {
          position: relative;
          display: flex;
          width: 26px;
          height: 46px;
          justify-content: center;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          background: rgba(0, 31, 92, 0.48);
          padding-top: 8px;
        }

        .hero-scroll-dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #41b6ff;
          box-shadow: 0 0 8px rgba(65, 182, 255, 0.9);
          animation: heroScrollDot 2.2s ease-in-out infinite;
        }

        /* One-time entrance animations: opacity + transform only. */
        .hero-enter {
          animation: heroEnter 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-enter-1 {
          animation-delay: 60ms;
        }

        .hero-enter-2 {
          animation-delay: 130ms;
        }

        .hero-enter-3 {
          animation-delay: 210ms;
        }

        .hero-enter-4 {
          animation-delay: 280ms;
        }

        @keyframes heroEnter {
          from {
            opacity: 0;
            transform: translate3d(0, 12px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes heroScrollDot {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          20% {
            opacity: 1;
          }
          70% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 22px, 0);
          }
        }

        @media (min-width: 640px) {
          .rapid-hero {
            padding-inline: 24px;
          }

          .hero-actions {
            width: min(100%, 850px);
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hero-signature {
            display: block;
          }
        }

        @media (min-width: 768px) {
          .hero-scroll {
            display: flex;
          }
        }

        @media (min-width: 1024px) {
          .rapid-hero {
            padding: 84px 5% 24px;
          }

          .hero-actions {
            display: flex;
            width: auto;
            max-width: none;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
          }
        }

        @media (min-width: 1024px) and (max-height: 820px) {
          .rapid-hero {
            padding-top: 78px;
            padding-bottom: 8px;
          }

          .hero-logo-wrap {
            width: 9.25rem;
            height: 9.25rem;
          }
        }

        @media (min-width: 1024px) and (max-height: 720px) {
          .rapid-hero {
            padding-top: 74px;
            padding-bottom: 6px;
          }

          .hero-logo-wrap {
            width: 8.35rem;
            height: 8.35rem;
          }

          .hero-signature,
          .hero-scroll-label {
            display: none;
          }
        }

        @media (min-width: 1024px) and (max-height: 680px) {
          .hero-tags {
            display: none;
          }
        }

        @media (max-width: 639px) {
          .rapid-hero {
            padding-top: 92px;
            padding-bottom: 28px;
          }

          .hero-logo-wrap {
            width: 8.25rem;
            height: 8.25rem;
          }

          .hero-heading {
            font-size: clamp(2.35rem, 11.4vw, 3.45rem);
          }

          .hero-subheading {
            max-width: 34rem;
            font-size: 0.86rem;
            line-height: 1.58;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-enter,
          .hero-scroll-dot {
            animation: none !important;
          }

          .hero-video,
          :global(.hero-btn) {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
