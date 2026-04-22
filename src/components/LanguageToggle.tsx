"use client";

import { useLocaleContext } from "@/app/providers";

export function LanguageToggle() {
  const { locale, toggleLocale } = useLocaleContext();

  return (
    <button
      onClick={toggleLocale}
      className="text-sm font-body font-semibold tracking-widest text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer px-2 py-1 rounded border border-slate-700 hover:border-slate-500"
      aria-label={locale === "sv" ? "Switch to English" : "Byt till svenska"}
    >
      {locale === "sv" ? "EN" : "SV"}
    </button>
  );
}
