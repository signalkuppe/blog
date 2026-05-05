import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://e600a6f00828820db424b01363ba28f3@o4508455479672832.ingest.de.sentry.io/4511337208152144",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
