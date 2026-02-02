import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Message from '../../../models/Message';

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        await Message.create(body);

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Contact Error", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
