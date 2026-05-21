"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-28 px-6 bg-brand-dark relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-purple/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs tracking-[0.4em] text-brand-red uppercase font-semibold mb-4 font-body">
            SWAYDAY
          </p>
          <h2 className="font-display text-6xl md:text-7xl leading-none text-white mb-8 tracking-wide">
            {t("title")}
          </h2>
          <div className="space-y-5">
            <p className="text-slate-300 text-lg leading-relaxed font-body">
              {t("p1")}
            </p>
            <p className="text-slate-400 leading-relaxed font-body">
              {t("p2")}
            </p>
            <p className="text-slate-400 leading-relaxed font-body">
              {t("p3")}
            </p>
          </div>
          {/* Gradient divider */}
          <div className="mt-10 h-px w-24 bg-gradient-to-r from-brand-red to-brand-pink" />
        </motion.div>

        {/* Photo */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="https://pub-9e5c7500d8b14a3196c2f3c24474759b.r2.dev/band/band2.jpg"
              alt="SWAYDAY bandet"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Color overlay matching brand */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/40 via-transparent to-brand-purple/10" />
          </div>
          {/* Decorative border glow */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-tr from-brand-red/20 via-transparent to-brand-pink/20 -z-10 blur-sm" />
        </motion.div>
      </div>
    </section>
  );
}
