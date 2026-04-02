export function parseHostname(inputHostHeader: string | null): string | null {
  if (!inputHostHeader) return null;

  const trimmed = inputHostHeader.trim().toLowerCase();
  if (!trimmed) return null;

  const withoutPort = trimmed.replace(/:\d+$/, "");
  return withoutPort || null;
}

