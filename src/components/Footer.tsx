"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#06060c] border-t border-brand-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" aria-label="SWAYDAY – hem">
          <Image
            src="/logo/swaydaylogo_full_res_VIT.png"
            alt="SWAYDAY"
            width={1920}
            height={1080}
            className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
          />
        </Link>

        <p className="text-brand-muted text-sm font-body text-center">
          © {year} SWAYDAY. {t("rights")}.
        </p>

        <nav className="flex gap-6">
          <Link
            href="/"
            className="text-xs tracking-widest uppercase text-slate-500 hover:text-slate-300 transition-colors font-body"
          >
            {tNav("home")}
          </Link>
          <Link
            href="/book"
            className="text-xs tracking-widest uppercase text-slate-500 hover:text-slate-300 transition-colors font-body"
          >
            {tNav("book")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
