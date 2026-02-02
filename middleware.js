import { NextResponse } from 'next/server';

export function middleware(request) {
    const session = request.cookies.get('session_token');
    const nextAuthSession = request.cookies.get('next-auth.session-token') || 
                           request.cookies.get('__Secure-next-auth.session-token');
    const { pathname } = request.nextUrl;

    const hasSession = !!(session || nextAuthSession);
    console.log('Middleware - Path:', pathname, 'Has Session:', hasSession);

    // Define protected routes
    const protectedRoutes = ['/dashboard'];

    // Define auth routes (public but redirect to dashboard if logged in)
    const authRoutes = ['/login', '/register'];

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // 1. If user is trying to access a protected route and has no session -> Redirect to Login
    if (isProtectedRoute && !hasSession) {
        console.log('Middleware - Redirecting to login, no session found');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 2. If user is trying to access Login/Register but HAS a session -> Redirect to Dashboard
    if (isAuthRoute && hasSession) {
        console.log('Middleware - Redirecting to dashboard, session exists');
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    console.log('Middleware - Allowing request to continue');
    // Allow the request to continue
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
