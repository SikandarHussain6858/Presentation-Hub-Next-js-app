import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../lib/auth';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        
        console.log('Registration attempt for email:', email);

        await dbConnect();
        console.log('Database connected');

        // 1. Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists:', email);
            return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
        }

        // 2. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Password hashed');

        // 3. Create User in MongoDB
        const uid = new Date().getTime().toString() + Math.random().toString(36).substring(2, 9);
        
        user = await User.create({
            email,
            password: hashedPassword,
            uid: uid,
            role: 'user'
        });
        
        console.log('User created in database:', user.email, user.uid);

        console.log('User created in database:', user.email, user.uid);

        // 4. Create Session
        const token = await signToken({ uid: user.uid, email: user.email });
        console.log('Token created');

        // 5. Set Cookie via Response
        const response = NextResponse.json({ success: true, user: { uid: user.uid, email: user.email } }, { status: 201 });
        response.cookies.set('session_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });
        
        console.log('Registration successful for:', email);
        return response;

    } catch (error) {
        console.error("Register Error:", error);
        console.error("Error stack:", error.stack);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
