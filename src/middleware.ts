import { NextRequest, NextResponse } from "next/server";
import { useSession } from "./server/lucia/lucia";
export async function middleware(req: NextRequest) {
  const { user, session } = await useSession()

  // Define public routes
  const publicRoutes = ["/signin", "/signup", "/api/Auth/SignIn", "/api/Auth/SignUp"];

  // Allow public routes without authentication
  if (publicRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect to signin if the user is not authenticated
  if (!user && !session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
} export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
