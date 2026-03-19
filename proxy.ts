import { timingSafeEqual } from "crypto";
import { Buffer } from "buffer";
import { isDevelopment } from "@/keystatic.config";
import { NextRequest, NextResponse } from "next/server";

const AUTH_REALM = "Keystatic Admin";
const ADMIN_PATHS = ["/keystatic", "/api/keystatic"];

const unauthorizedResponse = () =>
  new NextResponse(null, {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${AUTH_REALM}"`,
    },
  });

const requiresAdminAuth = (pathname: string) =>
  ADMIN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

const hasValidCredentials = (authHeader: string | null) => {
  if (!authHeader?.startsWith("Basic ")) {
    return false;
  }

  const token = authHeader.slice(6);
  let credentials: string;

  try {
    credentials = Buffer.from(token, "base64").toString("utf-8");
  } catch {
    return false;
  }

  const separatorIndex = credentials.indexOf(":");
  if (separatorIndex < 0) {
    return false;
  }

  const user = credentials.slice(0, separatorIndex);
  const password = credentials.slice(separatorIndex + 1);

  const expectedUser = process.env.KEYSTATIC_ADMIN_USER ?? "";
  const expectedPassword = process.env.KEYSTATIC_ADMIN_PASSWORD ?? "";

  if (user.length !== expectedUser.length || password.length !== expectedPassword.length) {
    return false;
  }

  return (
    timingSafeEqual(Buffer.from(user), Buffer.from(expectedUser)) &&
    timingSafeEqual(Buffer.from(password), Buffer.from(expectedPassword))
  );
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!requiresAdminAuth(pathname)) {
    return NextResponse.next();
  }

  if (isDevelopment) {
    return NextResponse.next();
  }

  if (!hasValidCredentials(request.headers.get("authorization"))) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};
