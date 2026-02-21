import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const parts = hostname.split(".");

  // For local dev: use ?slug= query param directly
  if (hostname.startsWith("localhost") || hostname.startsWith("127.0.0.1")) {
    return NextResponse.next();
  }

  // Extract subdomain: acme-plumbing.evioshq.com → acme-plumbing
  if (parts.length >= 3) {
    const subdomain = parts[0];
    if (subdomain === "www") return NextResponse.next();

    const url = request.nextUrl.clone();
    if (!url.searchParams.has("slug")) {
      url.searchParams.set("slug", subdomain);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|team|prospects|evios).*)",
  ],
};
