"use client";

import { NextIntlClientProvider } from "next-intl";
import { createContext, useContext, useState, useEffect } from "react";
import sv from "../../messages/sv.json";
import en from "../../messages/en.json";

type Locale = "sv" | "en";

const LocaleCtx = createContext<{
  locale: Locale;
  toggleLocale: () => void;
}>({ locale: "sv", toggleLocale: () => {} });

export const useLocaleContext = () => useContext(LocaleCtx);

export function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("sv");

  useEffect(() => {
    const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
    if (match?.[1] === "en" || match?.[1] === "sv") {
      setLocale(match[1] as Locale);
    }
  }, []);

  const toggleLocale = () => {
    const next: Locale = locale === "sv" ? "en" : "sv";
    setLocale(next);
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000`;
  };

  return (
    <LocaleCtx.Provider value={{ locale, toggleLocale }}>
      <NextIntlClientProvider locale={locale} timeZone="Europe/Stockholm" messages={locale === "sv" ? sv : en}>
        {children}
      </NextIntlClientProvider>
    </LocaleCtx.Provider>
  );
}
