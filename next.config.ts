import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy-Report-Only",
    // Report-only for now while we stage enforcement and monitor reports.
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; base-uri 'self';",
  },
];

// Keystatic admin overrides — only headers that DIFFER from the baseline.
// All other SECURITY_HEADERS (HSTS, Permissions-Policy, nosniff, Referrer-Policy)
// are inherited automatically because both source patterns match.
// Justification:
//   X-Frame-Options SAMEORIGIN — Keystatic editor uses iframes for field panels.
//   unsafe-eval — Keystatic's admin bundle requires runtime eval.
//   blob: in img-src — image preview thumbnails use blob URLs.
//   frame-ancestors 'self' — matches SAMEORIGIN intent for CSP-level framing.
const KEYSTATIC_CSP_OVERRIDES = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Content-Security-Policy-Report-Only",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none'; base-uri 'self';",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
      {
        source: "/keystatic/:path*",
        headers: KEYSTATIC_CSP_OVERRIDES,
      },
      {
        source: "/api/keystatic/:path*",
        headers: KEYSTATIC_CSP_OVERRIDES,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
