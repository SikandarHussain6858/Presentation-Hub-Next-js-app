import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Feedback from '../../../models/Feedback';

export async function POST(request) {
    try {
        const { rating, comment } = await request.json();

        if (!rating || !comment) {
            return NextResponse.json({ success: false, error: 'Rating and comment are required' }, { status: 400 });
        }

        await dbConnect();
        const feedback = await Feedback.create({ rating, comment });

        return NextResponse.json({ success: true, data: feedback }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        // Get average rating and count
        const stats = await Feedback.aggregate([
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalCount: { $sum: 1 }
                }
            }
        ]);

        // Get recent 3 feedbacks
        const recent = await Feedback.find().sort({ createdAt: -1 }).limit(3);

        const data = {
            average: stats[0]?.averageRating || 0,
            count: stats[0]?.totalCount || 0,
            recent
        };

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
