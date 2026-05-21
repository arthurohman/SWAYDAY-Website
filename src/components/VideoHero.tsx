"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const VIDEO_SRC = "https://pub-9e5c7500d8b14a3196c2f3c24474759b.r2.dev/background/disconnecting_background.mp4"; // Paste your Cloudflare R2 public URL here

export function VideoHero() {
  const t = useTranslations("hero");
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      {VIDEO_SRC ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          // className="absolute inset-0 w-full h-full object-cover grayscale"  // Optional grayscale filter for a more cinematic look
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : (
        /* Gradient fallback while no video is set */
        <div className="absolute inset-0 bg-gradient-to-br from-[#09090f] via-[#1a0a1e] to-[#09090f]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(164,85,247,0.15)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(244,63,94,0.12)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,_rgba(236,72,153,0.1)_0%,_transparent_60%)]" />
        </div>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Image
            src="https://pub-9e5c7500d8b14a3196c2f3c24474759b.r2.dev/logo/swaydaylogo_full_res_VIT.png"
            alt="SWAYDAY"
            width={1506}
            height={203}
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 70vw, 960px"
            className="w-[82vw] sm:w-[70vw] md:w-[62vw] lg:w-[56vw] max-w-[960px] h-auto mx-auto mb-6 drop-shadow-2xl"
            priority
            loading="eager"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg sm:text-xl tracking-[0.3em] text-slate-300 uppercase font-body font-light mb-10"
        >
          {/* {t("tagline")} */}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link
            href="/book"
            className="inline-block px-10 py-4 bg-gradient-to-r from-brand-red to-brand-pink text-white font-body font-semibold tracking-widest uppercase text-sm rounded-full hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-brand-red/25 cursor-pointer"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
