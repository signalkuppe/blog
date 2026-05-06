import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://e600a6f00828820db424b01363ba28f3@o4508455479672832.ingest.de.sentry.io/4511337208152144",
  sendDefaultPii: false,
  autoSessionTracking: false,
  beforeSend(event) {
    // Ignore failed prefetch requests from Astro's prefetch module
    const msg = event.exception?.values?.[0]?.value ?? "";
    if (msg.includes("Load failed") || msg.includes("Failed to fetch")) {
      const frames =
        event.exception?.values?.[0]?.stacktrace?.frames ?? [];
      const isPrefetch = frames.some((f) => f.filename?.includes("index."));
      if (isPrefetch) return null;
    }
    return event;
  },
});
