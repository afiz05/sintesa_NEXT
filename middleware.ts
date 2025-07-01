import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Tetapkan basePath default "" jika tidak ada
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Check backend status
async function checkBackendStatus(): Promise<boolean> {
  try {
    const backendStatusUrl =
      process.env.NEXT_PUBLIC_STATUS || "http://localhost:88/next/status";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(backendStatusUrl, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return data.status === "OK";
    }
    return false;
  } catch (error) {
    console.error("Backend status check failed:", error);
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuth = request.cookies.has("userAuth");

  // Bersihkan pathname dari basePath
  const path = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length) || "/"
    : pathname;

  const publicRoutes = ["/login", "/register", "/offline", "/debug/auth"];
  const isPublic = publicRoutes.includes(path);

  // ✅ Jika menuju halaman offline, selalu izinkan (tidak peduli status login)
  if (path === "/offline") {
    return NextResponse.next();
  }

  // ✅ Check backend status untuk semua route kecuali offline
  // Note: Untuk production, sebaiknya implementasi ini di sisi client
  // karena middleware edge runtime memiliki keterbatasan

  // ✅ Redirect root "/" ke dashboard
  if (path === "/") {
    return NextResponse.redirect(new URL(`${basePath}/dashboard`, request.url));
  }

  // Cegah akses halaman private tanpa login
  if (!isPublic && !hasAuth) {
    return NextResponse.redirect(new URL(`${basePath}/login`, request.url));
  }

  // Cegah akses login/register saat sudah login (kecuali offline)
  if ((path === "/login" || path === "/register") && hasAuth) {
    return NextResponse.redirect(new URL(`${basePath}/dashboard`, request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
