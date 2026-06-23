// Load Sentry lazily, after the page is interactive, so its ~47 KB browser SDK
// does not block first paint or input responsiveness (Core Web Vitals: FCP /
// FID / INP). Using a dynamic import keeps the SDK out of the eager page bundle
// — it is fetched as a separate chunk when the main thread is idle.
function initSentry() {
  import("@sentry/astro").then(({ init }) => {
    init({
      dsn: "https://e600a6f00828820db424b01363ba28f3@o4508455479672832.ingest.de.sentry.io/4511337208152144",
      sendDefaultPii: false,
      autoSessionTracking: false,
      beforeSend(event) {
        // Ignore failed prefetch requests from Astro's prefetch module
        const msg = event.exception?.values?.[0]?.value ?? "";
        if (msg.includes("Load failed") || msg.includes("Failed to fetch")) {
          const frames = event.exception?.values?.[0]?.stacktrace?.frames ?? [];
          const isPrefetch = frames.some((f) => f.filename?.includes("index."));
          if (isPrefetch) return null;
        }
        return event;
      },
    });
  });
}

if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(initSentry, { timeout: 5000 });
  } else {
    window.addEventListener("load", () => setTimeout(initSentry, 2000));
  }
}
