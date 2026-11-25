import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  let changed = false;

  for (const key of [...url.searchParams.keys()]) {
    if (key.toLowerCase().startsWith("utm_")) {
      url.searchParams.delete(key);
      changed = true;
    }
  }

  if (changed) {
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
