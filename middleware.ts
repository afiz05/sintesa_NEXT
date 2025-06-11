import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const basePath = "/v3/next"; // Sesuai next.config.js

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuthCookie = request.cookies.has("userAuth");

  // Hapus basePath dari pathname untuk perbandingan route internal
  const cleanedPath = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length) || "/"
    : pathname;

  // Tanpa basePath karena cleanedPath sudah dihilangkan prefix-nya
  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.includes(cleanedPath);

  // Jika sudah login dan coba akses login/register, redirect ke dashboard
  if (isPublicRoute && hasAuthCookie) {
    return NextResponse.redirect(new URL(`${basePath}/dashboard`, request.url));
  }

  // Jika belum login dan coba akses halaman private, redirect ke login
  if (!isPublicRoute && !hasAuthCookie) {
    return NextResponse.redirect(new URL(`${basePath}/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Jalankan middleware hanya pada rute di bawah basePath
    "/v3/next/:path*",
  ],
};
