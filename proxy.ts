import { NextRequest, NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === "production";

export function proxy(request: NextRequest) {
  if (isProduction) {
    return new NextResponse(null, { status: 404 });
  }

  const pathname = request.nextUrl.pathname;
  if (pathname === "/admin" || pathname === "/admin/") {
    return NextResponse.rewrite(new URL("/admin/index.html", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

