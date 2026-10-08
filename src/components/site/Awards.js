"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  ExternalLink,
  ImageIcon,
  Medal,
  Play,
  Sparkles,
  Trophy,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const MAX_HOMEPAGE_AWARDS = 4;
const ease = [0.16, 1, 0.3, 1];

function getAwardsGridClass(count) {
  if (count === 1) return "mx-auto max-w-[820px] grid-cols-1";
  if (count === 2) return "mx-auto max-w-[1100px] grid-cols-1 md:grid-cols-2";
  if (count === 3) return "mx-auto max-w-[1320px] grid-cols-1 md:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";
}

function hasImage(award) {
  return Boolean(award?.image?.url);
}

function hasVideo(award) {
  return Boolean(award?.video?.url);
}

function getAwardIcon(index) {
  return [Trophy, Medal, Award][index % 3];
}

function AwardArtwork({ award, Icon = Trophy, sizes = "100vw", className = "" }) {
  if (hasImage(award)) {
    return (
      <Image
        src={award.image.url}
        alt={award.title ? `${award.title} recognition photograph` : "Award recognition photograph"}
        fill
        sizes={sizes}
        className={`object-cover object-center ${className}`}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#00163F] via-[#003580] to-[#0062CC]/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(65,182,255,.22),transparent_65%)]" />
      <Icon size={84} strokeWidth={0.8} className="relative text-[#8BD5FF]/70" aria-hidden="true" />
    </div>
  );
}

export default function Awards({ data = {} }) {
  const reduceMotion = useReducedMotion();
  const [selectedAward, setSelectedAward] = useState(null);
  const awards = Array.isArray(data.items) ? data.items : [];

  const publishedCount = awards.filter((award) => award && award.published !== false).length;

  const visibleAwards = useMemo(() => {
    const all = Array.isArray(data.items) ? data.items : [];
    return [...all]
      .filter((award) => award && award.published !== false)
      .sort((a, b) => {
        if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
        const orderDifference = Number(a.order || 0) - Number(b.order || 0);
        return orderDifference || Number(b.year || 0) - Number(a.year || 0);
      })
      .slice(0, MAX_HOMEPAGE_AWARDS);
  }, [data.items]);

  if (!visibleAwards.length) return null;

  return (
    <>
      <section
        id="awards"
        className="relative overflow-hidden bg-[#001F5C] px-[5%] py-24 text-white lg:py-32"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-[#41B6FF]/10 blur-[150px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -bottom-40 h-[560px] w-[560px] rounded-full bg-[#0062CC]/20 blur-[170px]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <Trophy aria-hidden="true" strokeWidth={0.6} className="pointer-events-none absolute -right-16 top-24 h-[320px] w-[320px] rotate-[-10deg] text-white/[0.018]" />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.6fr] lg:items-end">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="flex items-center gap-3 text-[#41B6FF]">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-[#41B6FF]/20 bg-[#41B6FF]/[0.08] backdrop-blur-xl">
                  <Trophy size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[.22em]">Awards & Recognition</div>
                  <div className="mt-1 text-[8px] font-bold uppercase tracking-[.13em] text-white/30">Recognised standards of excellence</div>
                </div>
              </div>
              <h2 className="mt-7 max-w-[950px] font-barlowCond text-[clamp(3.2rem,6.5vw,6.6rem)] font-black uppercase leading-[.88] tracking-[-.02em] text-white">
                Excellence recognised.
                <br />
                <span className="bg-gradient-to-r from-[#41B6FF] via-[#8BD5FF] to-white bg-clip-text text-transparent">
                  Standards maintained.
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="lg:ml-auto"
            >
              <p className="max-w-[520px] text-[1rem] leading-[1.9] text-white/55">
                Recognition reflects the standards we work to protect every day — from garment care and service quality to customer experience, consistency and trust.
              </p>
              <div className="mt-7 grid grid-cols-[auto_1fr] items-center gap-5 border-t border-white/10 pt-6">
                <div className="font-barlowCond text-[3rem] font-black leading-none tracking-[-.04em]">{publishedCount}</div>
                <div>
                  <div className="text-[8px] font-black uppercase tracking-[.17em] text-[#41B6FF]">Published Recognitions</div>
                  <div className="mt-1 text-[10px] leading-5 text-white/30">Milestones reflecting service, quality and continued progress.</div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="mt-12 h-px origin-left bg-gradient-to-r from-[#41B6FF]/50 via-white/10 to-transparent"
          />

          <div className={`mt-12 grid gap-5 ${getAwardsGridClass(visibleAwards.length)}`}>
            {visibleAwards.map((award, index) => (
              <AwardCard
                key={award.id || `${award.title}-${index}`}
                award={award}
                index={index}
                single={visibleAwards.length === 1}
                reduceMotion={reduceMotion}
                onOpen={() => setSelectedAward(award)}
              />
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-[.85rem] font-bold text-white/50">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#41B6FF]">
                <Sparkles size={14} />
              </span>
              <span>Recognition built on service, consistency and care.</span>
            </div>
            {data.awardsPageUrl && (
              <a href={data.awardsPageUrl} className="group inline-flex items-center gap-2 self-start text-[9px] font-black uppercase tracking-[.14em] text-[#41B6FF] sm:self-auto">
                View All Recognition
                <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedAward && (
          <AwardModal
            key={selectedAward.id || selectedAward.title}
            award={selectedAward}
            reduceMotion={reduceMotion}
            onClose={() => setSelectedAward(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function AwardCard({ award, index, onOpen, reduceMotion, single }) {
  const Icon = getAwardIcon(index);
  const imageAvailable = hasImage(award);
  const videoAvailable = hasVideo(award);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.07, ease }}
      whileHover={reduceMotion ? undefined : { y: -7 }}
      className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.055] backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-500 hover:border-[#41B6FF]/35 hover:bg-white/[0.075] hover:shadow-[0_30px_100px_rgba(0,0,0,.20)] ${single ? "md:grid md:grid-cols-[1.08fr_.92fr]" : ""}`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Explore ${award.title || "award"}${videoAvailable ? " image and video" : ""}`}
        className="absolute inset-0 z-20 cursor-pointer rounded-[30px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#41B6FF]"
      />

      <div className={`relative w-full overflow-hidden bg-[#00163F] ${single ? "aspect-[16/10] md:aspect-auto md:min-h-[460px]" : "aspect-[4/3]"}`}>
        {/* Always display the recognition image on the homepage, even when a video exists. */}
        <AwardArtwork
          award={award}
          Icon={Icon}
          sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 800px"
          className="transition-transform duration-[900ms] group-hover:scale-[1.055]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001F5C]/95 via-[#001F5C]/10 to-transparent" />
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#41B6FF]/20 blur-[70px]" />

        {videoAvailable && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#001F5C]/75 px-3 py-2 text-[8px] font-black uppercase tracking-[.14em] text-white shadow-xl backdrop-blur-xl">
            <Video size={12} />
            {imageAvailable ? "Photo + Film" : "Film Available"}
          </div>
        )}
        {award.featured === true && (
          <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#41B6FF]/20 bg-[#001F5C]/75 px-3 py-2 text-[7px] font-black uppercase tracking-[.14em] text-[#8BD5FF] backdrop-blur-xl">
            <Sparkles size={10} /> Featured
          </div>
        )}
        {award.year && (
          <div className="absolute bottom-5 left-5">
            <div className="text-[8px] font-black uppercase tracking-[.18em] text-[#8BD5FF]">Recognition Year</div>
            <div className="mt-1 font-barlowCond text-[2.6rem] font-black leading-none tracking-[-.03em] text-white">{award.year}</div>
          </div>
        )}
      </div>

      <div className={`relative flex flex-col p-6 ${single ? "md:justify-center md:p-10" : ""}`}>
        <div aria-hidden="true" className="absolute right-5 top-4 font-barlowCond text-[4.5rem] font-black leading-none tracking-[-.07em] text-white/[0.035]">
          {String(index + 1).padStart(2, "0")}
        </div>
        {award.recognition && (
          <div className="relative flex items-center gap-2 text-[8px] font-black uppercase tracking-[.18em] text-[#41B6FF]">
            <span className="h-px w-5 bg-[#41B6FF]" />{award.recognition}
          </div>
        )}
        <h3 className={`relative mt-4 font-black leading-[1.08] tracking-[-.035em] text-white ${single ? "text-[clamp(1.8rem,3vw,2.7rem)]" : "text-[1.3rem]"}`}>
          {award.title}
        </h3>
        {award.organization && <p className="relative mt-2 text-[.78rem] font-bold leading-5 text-white/40">{award.organization}</p>}
        {award.category && (
          <div className="relative mt-4 w-fit rounded-full border border-[#41B6FF]/10 bg-[#41B6FF]/[0.06] px-3 py-1.5 text-[7px] font-black uppercase tracking-[.13em] text-[#8BD5FF]">{award.category}</div>
        )}
        {award.description && <p className="relative mt-5 line-clamp-3 text-[.82rem] leading-6 text-white/48">{award.description}</p>}
        <div className="relative mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
          <span className="text-[8px] font-black uppercase tracking-[.14em] text-[#41B6FF]">
            {videoAvailable ? "Explore Photo & Film" : "Explore Recognition"}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#41B6FF]/15 bg-[#41B6FF]/[0.06] text-[#41B6FF] transition-all duration-300 group-hover:bg-[#41B6FF] group-hover:text-[#001F5C]">
            <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#41B6FF] via-[#0084E3] to-white transition-all duration-500 group-hover:w-full" />
    </motion.article>
  );
}

function AwardVideoPlayer({ award }) {
  const [hasError, setHasError] = useState(false);
  return (
    <div className="relative w-full bg-[#000A20]">
      {hasError ? (
        <div className="flex min-h-[290px] flex-col items-center justify-center gap-4 px-8 text-center text-white/60">
          <Video size={32} />
          <p className="max-w-[300px] text-sm leading-6">This video could not be played. Please try again or use another browser.</p>
        </div>
      ) : (
        <video
          key={award.video.url}
          src={award.video.url}
          poster={award.image?.url || undefined}
          controls
          playsInline
          preload="metadata"
          onError={() => setHasError(true)}
          aria-label={`${award.title || "Award"} recognition video`}
          className="block h-auto max-h-[65dvh] w-full bg-black object-contain"
        >
          Your browser does not support HTML5 video.
        </video>
      )}
      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#00163F] px-5 py-3.5">
        <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[.14em] text-white/70"><Video size={14} className="text-[#41B6FF]" />Recognition Film</span>
        <span className="text-[9px] text-white/35">Use player controls for fullscreen</span>
      </div>
    </div>
  );
}

function AwardModal({ award, reduceMotion, onClose }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const imageAvailable = hasImage(award);
  const videoAvailable = hasVideo(award);
  const [activeMedia, setActiveMedia] = useState(imageAvailable ? "image" : videoAvailable ? "video" : "image");
  const bothAvailable = imageAvailable && videoAvailable;

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll('button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close award details"
        onClick={onClose}
        className="absolute inset-0 bg-[#000B26]/85 backdrop-blur-xl"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={award.title || "Award details"}
        initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ duration: reduceMotion ? 0 : 0.42, ease }}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-[1150px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#001F5C] shadow-[0_40px_140px_rgba(0,0,0,.55)] sm:rounded-[32px]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-[350px] w-[350px] rounded-full bg-[#41B6FF]/15 blur-[120px]" />
        <div className="relative z-20 flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#00163F]/90 px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <div className="text-[8px] font-black uppercase tracking-[.2em] text-[#41B6FF]">Awards & Recognition</div>
            <div className="mt-1 truncate text-sm font-bold text-white/85">{award.title}</div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close award details"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/75 transition hover:border-[#41B6FF]/40 hover:bg-[#41B6FF] hover:text-[#001F5C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41B6FF]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto overscroll-contain">
          <div className="grid items-start lg:grid-cols-[1.05fr_.95fr]">
            <div className="min-w-0 self-start border-b border-white/10 bg-[#000A20] lg:border-b-0 lg:border-r">
              {bothAvailable && (
                <div className="flex gap-2 border-b border-white/10 bg-[#00163F] p-3 sm:p-4" aria-label="Recognition media views">
                  <button
                    type="button"
                    aria-pressed={activeMedia === "image"}
                    onClick={() => setActiveMedia("image")}
                    className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[10px] font-black uppercase tracking-[.12em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#41B6FF] ${activeMedia === "image" ? "border-[#41B6FF]/45 bg-[#41B6FF]/15 text-[#8BD5FF]" : "border-white/10 bg-white/[0.04] text-white/50 hover:text-white"}`}
                  >
                    <ImageIcon size={15} /> Award Photo
                  </button>
                  <button
                    type="button"
                    aria-pressed={activeMedia === "video"}
                    onClick={() => setActiveMedia("video")}
                    className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[10px] font-black uppercase tracking-[.12em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#41B6FF] ${activeMedia === "video" ? "border-[#41B6FF]/45 bg-[#41B6FF]/15 text-[#8BD5FF]" : "border-white/10 bg-white/[0.04] text-white/50 hover:text-white"}`}
                  >
                    <Play size={14} /> Recognition Film
                  </button>
                </div>
              )}
              {/* The video element unmounts when switching to the photo, stopping playback. */}
              {activeMedia === "video" && videoAvailable ? (
                <AwardVideoPlayer award={award} />
              ) : (
                <div className="relative aspect-[4/3] min-h-[280px] overflow-hidden lg:aspect-auto lg:min-h-[560px]">
                  <AwardArtwork award={award} sizes="(max-width:1024px) 100vw, 55vw" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001F5C]/80 via-transparent to-transparent" />
                  {award.year && (
                    <div className="absolute bottom-7 left-7">
                      <div className="text-[8px] font-black uppercase tracking-[.18em] text-[#8BD5FF]">Recognition Year</div>
                      <div className="mt-1 font-barlowCond text-[4rem] font-black leading-none text-white">{award.year}</div>
                    </div>
                  )}
                </div>
              )}
              {bothAvailable && (
                <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#00163F] px-5 py-3.5">
                  <span className="text-[9px] font-medium text-white/40">{activeMedia === "image" ? "01 / 02 · Award photograph" : "02 / 02 · Recognition film"}</span>
                  <button
                    type="button"
                    onClick={() => setActiveMedia(activeMedia === "image" ? "video" : "image")}
                    className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[.12em] text-[#8BD5FF] transition hover:text-white"
                  >
                    {activeMedia === "image" ? <>Watch Film <ArrowRight size={13} /></> : <><ArrowLeft size={13} /> View Photo</>}
                  </button>
                </div>
              )}
            </div>

            <div className="relative p-7 sm:p-9 lg:p-11">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-[#41B6FF]/15 bg-[#41B6FF]/[0.07] text-[#41B6FF]"><Trophy size={16} /></span>
                <div>
                  <div className="text-[8px] font-black uppercase tracking-[.2em] text-[#41B6FF]">Our Recognition</div>
                  {award.recognition && <p className="mt-1 text-[9px] font-semibold text-white/35">{award.recognition}</p>}
                </div>
              </div>
              <h3 className="mt-7 font-barlowCond text-[clamp(2.3rem,4vw,4rem)] font-black uppercase leading-[.95] tracking-[.3px] text-white">{award.title}</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {award.organization && <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-2 text-[8px] font-black uppercase tracking-[.1em] text-white/55">{award.organization}</span>}
                {award.category && <span className="rounded-full border border-[#41B6FF]/15 bg-[#41B6FF]/[0.07] px-3 py-2 text-[8px] font-black uppercase tracking-[.1em] text-[#8BD5FF]">{award.category}</span>}
                {award.year && <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-2 text-[8px] font-black uppercase tracking-[.1em] text-white/55"><CalendarDays size={11} />{award.year}</span>}
              </div>
              <div className="my-8 h-px bg-gradient-to-r from-[#41B6FF]/35 via-white/10 to-transparent" />
              {award.description && (
                <div>
                  <div className="text-[8px] font-black uppercase tracking-[.18em] text-[#41B6FF]">Recognition Story</div>
                  <p className="mt-4 whitespace-pre-line text-[.94rem] leading-[1.9] text-white/60">{award.description}</p>
                </div>
              )}
              {bothAvailable && (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#41B6FF]/10 bg-[#41B6FF]/[0.05] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#41B6FF]/10 text-[#41B6FF]"><ImageIcon size={15} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#8BD5FF]">The Complete Recognition</p>
                    <p className="mt-2 text-[.75rem] leading-6 text-white/45">Explore the official photograph and recognition film using the media selector.</p>
                  </div>
                </div>
              )}
              {award.sourceUrl && (
                <div className="mt-9 border-t border-white/[0.08] pt-7">
                  <a href={award.sourceUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-[#0062CC] via-[#0084E3] to-[#41B6FF] px-6 py-3 text-[9px] font-black uppercase tracking-[.14em] text-white shadow-[0_12px_35px_rgba(0,98,204,.2)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(65,182,255,.25)]">
                    View Official Recognition <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
