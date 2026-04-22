"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — edit these two constants and the video lists below
// ─────────────────────────────────────────────────────────────────────────────

// Your Supabase project URL and storage bucket name
const CLOUDFLARE_URL = "https://pub-9e5c7500d8b14a3196c2f3c24474759b.r2.dev";


// To add a video: add one line to the array for the right category.
//   file        → filename as it appears in the Supabase folder
//   orientation → "landscape" (16:9) or "portrait" (9:16)
//   label       → optional display name; falls back to the filename
const CATEGORIES = [
  {
    key: "wedding",
    folder: "weddings", // ← must match your Supabase folder name exactly
    labelSv: "Bröllop",
    labelEn: "Weddings",
    accent: "#ec4899",
    glow: "rgba(236,72,153,0.15)",
    borderColor: "border-brand-pink/30",
    videos: [
      { file: "clip1.mp4", orientation: "landscape" as const },
      { file: "clip2.mp4", orientation: "portrait" as const },
      { file: "clip3.mp4", orientation: "landscape" as const },
    ],
  },
  {
    key: "corporate",
    folder: "corporate", // ← must match your Supabase folder name exactly
    labelSv: "Företagsevent",
    labelEn: "Corporate Events",
    accent: "#a855f7",
    glow: "rgba(168,85,247,0.15)",
    borderColor: "border-brand-purple/30",
    videos: [
      { file: "clip1.mp4", orientation: "landscape" as const },
      { file: "clip2.mp4", orientation: "landscape" as const },
      { file: "clip3.mp4", orientation: "portrait" as const },
    ],
  },
  {
    key: "concert",
    folder: "concerts", // ← must match your Supabase folder name exactly
    labelSv: "Konserter",
    labelEn: "Concerts",
    accent: "#f43f5e",
    glow: "rgba(244,63,94,0.15)",
    borderColor: "border-brand-red/30",
    videos: [
      { file: "clip1.mp4", orientation: "landscape" as const },
      { file: "clip2.mp4", orientation: "portrait" as const },
      { file: "clip3.mp4", orientation: "landscape" as const },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

type Orientation = "landscape" | "portrait";

interface VideoEntry {
  file: string;
  orientation: Orientation;
  label?: string;
}

interface ActiveVideo extends VideoEntry {
  url: string;
}

function videoUrl(folder: string, file: string) {
  return `${CLOUDFLARE_URL}/${folder}/${file}`;
}

function displayLabel(v: VideoEntry) {
  return v.label ?? v.file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface Props {
  locale?: string;
}

export default function LiveVideoGallery({ locale = "sv" }: Props) {
  const [active, setActive] = useState<ActiveVideo | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.key}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: ci * 0.1, ease: "easeOut" }}
          >
            {/* Category header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1.5 h-6 rounded-full flex-shrink-0" style={{ background: cat.accent }} />
              <span className="font-display text-3xl tracking-wide" style={{ color: cat.accent }}>
                {locale === "sv" ? cat.labelSv : cat.labelEn}
              </span>
            </div>

            {/* Video grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              {cat.videos.map((video, vi) => {
                const isPortrait = video.orientation === "portrait";
                const url = videoUrl(cat.folder, video.file);
                return (
                  <motion.button
                    key={`${cat.key}-${vi}`}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: ci * 0.1 + vi * 0.08, ease: "easeOut" }}
                    onClick={() => setActive({ ...video, url })}
                    className={`group relative rounded-xl overflow-hidden border ${cat.borderColor} bg-brand-card cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`}
                    aria-label={`Spela ${displayLabel(video)}`}
                  >
                    {/* Glow background */}
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at center, ${cat.glow} 0%, transparent 70%)` }}
                    />

                    {/* Grid texture */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `linear-gradient(${cat.accent}22 1px, transparent 1px), linear-gradient(90deg, ${cat.accent}22 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                      }}
                    />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                        style={{
                          background: `${cat.accent}22`,
                          border: `1.5px solid ${cat.accent}55`,
                          boxShadow: `0 0 24px ${cat.glow}`,
                        }}
                      >
                        <Play size={20} className="ml-0.5" style={{ color: cat.accent }} fill={cat.accent} />
                      </div>
                    </div>

                    {/* Label bar */}
                    <div
                      className="absolute bottom-0 inset-x-0 px-3 py-2.5 translate-y-1 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-200"
                      style={{ background: `linear-gradient(to top, ${cat.accent}33, transparent)` }}
                    >
                      <p className="text-white text-xs font-body font-medium tracking-wide truncate">
                        {displayLabel(video)}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`relative z-10 w-full rounded-2xl overflow-hidden bg-brand-card shadow-2xl ${active.orientation === "portrait" ? "max-w-sm" : "max-w-3xl"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={active.url}
                src={active.url}
                controls
                autoPlay
                playsInline
                className="w-full bg-black max-h-[80vh]"
              />
              <div className="flex items-center justify-between px-5 py-3">
                <p className="text-white font-body font-medium text-sm">{displayLabel(active)}</p>
                <button
                  onClick={() => setActive(null)}
                  className="text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer"
                  aria-label="Stäng video"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
