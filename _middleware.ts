import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!token && pathname.includes("/dashboard")) {
    return NextResponse.redirect(`http://localhost:3000/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
