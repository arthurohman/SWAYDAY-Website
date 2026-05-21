"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import events from "@/data/events.json";
import LiveVideoGallery from "@/components/LiveVideoGallery";
import { SocialsRow } from "@/components/SocialsRow";

const CONTACT_EMAIL = "swaydaymusic@gmail.com";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// Aawd

const TYPE_LABELS: Record<string, string> = {
  wedding: "Bröllop & Fest",
  corporate: "Företagsevent",
  show: "Konsert",
};

const TYPE_COLORS: Record<string, string> = {
  wedding: "text-brand-pink border-brand-pink/30 bg-brand-pink/10",
  corporate: "text-brand-purple border-brand-purple/30 bg-brand-purple/10",
  show: "text-brand-red border-brand-red/30 bg-brand-red/10",
};

export default function BookPage() {
  const t = useTranslations("book");

  const cards = [
    {
      title: t("wedding_title"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      gradient: "from-brand-pink/20 to-brand-red/10",
      accent: "brand-pink",
    },
    {
      title: t("corporate_title"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
      gradient: "from-brand-purple/20 to-brand-pink/10",
      accent: "brand-purple",
    },
    {
      title: t("show_title"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
        </svg>
      ),
      gradient: "from-brand-red/20 to-brand-pink/10",
      accent: "brand-red",
    },
  ];

  return (
    <div className="bg-brand-dark min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-red/8 blur-3xl rounded-full" />
          <div className="absolute top-20 right-0 w-[400px] h-[300px] bg-brand-purple/8 blur-3xl rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-xs tracking-[0.4em] text-brand-red uppercase font-semibold mb-5 font-body">
              {t("eyebrow")}
            </p>
            <h1 className="font-display text-7xl sm:text-8xl md:text-9xl tracking-wide text-white mb-8 leading-none">
              {t("hero_title")}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto font-body">
              {t("hero_subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-brand-red to-brand-pink text-white font-body font-semibold tracking-widest uppercase text-sm rounded-full hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-brand-red/25 cursor-pointer"
              >
                <Mail size={16} />
                {t("contact_email")}
              </a>
              <a
                href="https://instagram.com/swaydaymusic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-brand-border text-slate-300 font-body font-semibold tracking-widest uppercase text-sm rounded-full hover:border-white/20 hover:text-white transition-all duration-200 cursor-pointer"
              >
                {t("contact_instagram")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pt-2 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="h-px w-24 bg-gradient-to-r from-brand-red to-brand-pink mx-auto mb-14" />

          <div className="flex flex-col md:flex-row">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="flex-1 flex flex-col items-center text-center px-8 md:px-12 py-10 md:py-0 relative"
              >
                {i > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/8" />
                )}
                {i > 0 && (
                  <div className="block md:hidden w-16 h-px bg-white/8 mb-10" />
                )}
                <div className="text-white/30 mb-5">{card.icon}</div>
                <h3 className="font-display text-4xl tracking-wide text-white mb-4">
                  {card.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live video gallery */}
      <section className="pb-4 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="h-px w-24 bg-gradient-to-r from-brand-red to-brand-pink mx-auto mb-10" />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-2"
          >
            <p className="text-xs tracking-[0.4em] text-brand-red uppercase font-semibold mb-3 font-body">
              {t("videos_eyebrow")}
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wide text-white">
              {t("videos_title")}
            </h2>
          </motion.div>
        </div>
      </section>
      <LiveVideoGallery />

      {/* Past events */}
      {/* <section className="py-20 px-6 bg-brand-card">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-14"
          >
            <h2 className="font-display text-6xl md:text-7xl tracking-wide text-white mb-2">
              {t("events_title")}
            </h2>
            <div className="h-px w-16 bg-gradient-to-r from-brand-red to-brand-pink mt-4" />
          </motion.div>

          <div className="space-y-px">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-5 px-4 border-b border-brand-border hover:bg-white/2 transition-colors duration-150 rounded-lg"
              >
                <div className="flex items-center gap-4 mb-2 sm:mb-0">
                  <span className="text-brand-muted text-sm font-body tabular-nums w-24">
                    {new Date(event.date).toLocaleDateString("sv-SE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <div>
                    <p className="text-white font-body font-medium">{event.venue}</p>
                    <p className="text-slate-500 text-sm font-body">{event.location}</p>
                  </div>
                </div>
                <span
                  className={`self-start sm:self-auto text-xs font-body font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${TYPE_COLORS[event.type]}`}
                >
                  {TYPE_LABELS[event.type]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact CTA */}
      {/* <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-pink/8 blur-3xl rounded-full" />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="font-display text-6xl md:text-8xl tracking-wide text-white mb-6">
              {t("contact_title")}
            </h2>
            <p className="text-slate-400 text-lg font-body mb-10">{t("contact_subtitle")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-brand-red to-brand-pink text-white font-body font-semibold tracking-widest uppercase text-sm rounded-full hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-brand-red/25 cursor-pointer"
              >
                <Mail size={16} />
                {t("contact_email")}
              </a>
              <a
                href="https://instagram.com/swaydaymusic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-brand-border text-slate-300 font-body font-semibold tracking-widest uppercase text-sm rounded-full hover:border-white/20 hover:text-white transition-all duration-200 cursor-pointer"
              >
                {t("contact_instagram")}
              </a>
            </div>
          </motion.div>
        </div>
      </section> */}
            <SocialsRow />
    </div>
  );
}
