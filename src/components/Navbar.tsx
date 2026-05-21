"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090f]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="SWAYDAY – hem">
          <Image
            src="/logo/swaydaylogo_full_res_VIT.png"
            alt="SWAYDAY"
            width={1920}
            height={1080}
            className="h-10 w-auto"
            priority
            loading="eager"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm tracking-widest font-semibold text-slate-300 hover:text-white transition-colors duration-200 uppercase"
          >
            {t("home")}
          </Link>
          <Link
            href="/book"
            className="text-sm tracking-widest font-semibold text-slate-300 hover:text-white transition-colors duration-200 uppercase"
          >
            {t("book")}
          </Link>
          <LanguageToggle />
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-white p-2 cursor-pointer"
            aria-label="Öppna meny"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#09090f]/98 backdrop-blur-md border-t border-white/5">
          <nav className="flex flex-col px-6 py-6 gap-6">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-lg tracking-widest font-semibold text-slate-300 hover:text-white transition-colors uppercase"
            >
              {t("home")}
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="text-lg tracking-widest font-semibold text-slate-300 hover:text-white transition-colors uppercase"
            >
              {t("book")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
