"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Replace these with real Spotify track/playlist IDs from SWAYDAY's Spotify page.
// Embed URL format: https://open.spotify.com/embed/track/{TRACK_ID}?utm_source=generator&theme=0
const SPOTIFY_EMBEDS = [
  "https://open.spotify.com/embed/track/5NMM8ktt0UHz3dvWYnlO7R?utm_source=generator&theme=0",
  "https://open.spotify.com/embed/track/2YvM0vq9dAebQY2Oj8svan?utm_source=generator&theme=0",
  "https://open.spotify.com/embed/track/2GC6IHhKKK6E5ti0xozdYK?utm_source=generator&theme=0",
];

export function SpotifySection() {
  const t = useTranslations("spotify");

  return (
    <section id="music" className="py-28 px-6 bg-brand-card relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-brand-pink/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.4em] text-brand-red uppercase font-semibold mb-4 font-body">
            Spotify
          </p>
          <h2 className="font-display text-6xl md:text-7xl tracking-wide text-white">
            {t("title")}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {SPOTIFY_EMBEDS.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <iframe
                style={{ borderRadius: "12px" }}
                src={src}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`SWAYDAY track ${i + 1}`}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
