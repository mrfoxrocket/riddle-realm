import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("session")?.value ?? null;

  const publicRoutes = ["/sign-up", "/sign-in"];

  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  if (req.method === "GET") {
    const res = NextResponse.next();
    const token = req.cookies.get("session")?.value ?? null;
    if (token) {
      res.cookies.set("session", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }
    return res;
  }

  const originHeader = req.headers.get("Origin");
  const hostHeader = req.headers.get("Host");
  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  let origin: URL;

  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, { status: 403 });
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
