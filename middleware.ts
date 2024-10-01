import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/builder(.*)", "/submit(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;
  if (isProtectedRoute(req)) auth().protect();
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/builder`, req.nextUrl));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
