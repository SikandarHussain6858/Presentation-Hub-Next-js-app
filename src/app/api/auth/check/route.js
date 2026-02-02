import { NextResponse } from 'next/server';
// Force Rebuild
import { verifyToken } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export async function POST() {
    // Logout by clearing cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('session_token', '', { maxAge: 0, path: '/' });
    return response;
}

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    console.log('Auth check - Has token:', !!token);

    if (!token) {
        console.log('Auth check - No token found');
        return NextResponse.json({ isAuthenticated: false }, { status: 200 });
    }

    const payload = await verifyToken(token);

    if (!payload) {
        console.log('Auth check - Token verification failed');
        return NextResponse.json({ isAuthenticated: false }, { status: 200 });
    }

    console.log('Auth check - User authenticated:', payload.email);
    return NextResponse.json({
        isAuthenticated: true,
        user: { uid: payload.uid, email: payload.email }
    }, { status: 200 });
}
