import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../lib/auth';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        await dbConnect();

        // 1. Find user (explicitly select password since it's marked as select: false in schema)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }

        // 2. Check Password
        const isMatch = await bcrypt.compare(password, user.password || '');
        if (!isMatch) {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }

        // 3. Create Session
        const token = await signToken({ uid: user.uid, email: user.email });

        // 4. Set Cookie
        const response = NextResponse.json({ success: true, user: { uid: user.uid, email: user.email } }, { status: 200 });
        response.cookies.set('session_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
    }
}
