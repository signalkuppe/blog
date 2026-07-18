// Client-side DOM helpers (kept dependency-free: these are imported by
// inline component scripts and end up in the browser bundles).

// Resolve a CSS custom property to a concrete color. light-dark() and
// color-mix() values aren't parseable by canvas APIs, so we let the
// browser compute them through a probe element.
export function resolveColorVar(name) {
  const probe = document.createElement("div");
  probe.style.color = `var(${name})`;
  document.documentElement.appendChild(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
}
