import { getRequestConfig } from "next-intl/server";

// Server-side config: always render Swedish initially.
// Client-side locale switching (EN/SV) is handled by Providers + cookie.
export default getRequestConfig(async () => {
  const locale = "sv";
  return {
    locale,
    timeZone: "Europe/Stockholm",
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
