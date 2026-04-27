import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Analytics from '../../../../models/Analytics';
import Presentation from '../../../../models/Presentation';

export async function POST(request) {
    try {
        await dbConnect();

        const { presentationId, eventType } = await request.json();

        if (!presentationId || !eventType) {
            return NextResponse.json(
                { success: false, error: 'presentationId and eventType required' },
                { status: 400 }
            );
        }

        // Validate eventType
        const validEventTypes = ['view', 'download', 'live_session_start'];
        if (!validEventTypes.includes(eventType)) {
            return NextResponse.json(
                { success: false, error: `Invalid eventType. Must be one of: ${validEventTypes.join(', ')}` },
                { status: 400 }
            );
        }

        // Get presentation to extract userId and name
        const presentation = await Presentation.findById(presentationId);
        if (!presentation) {
            return NextResponse.json(
                { success: false, error: 'Presentation not found' },
                { status: 404 }
            );
        }

        // Find or create Analytics document
        let analytics = await Analytics.findOne({
            presentationId,
            userId: presentation.userId,
        });

        if (!analytics) {
            analytics = new Analytics({
                presentationId,
                userId: presentation.userId,
                presentationName: presentation.presentationName,
                viewCount: 0,
                downloadCount: 0,
                liveSessionCount: 0,
                totalViewMinutes: 0,
                accessHistory: [],
            });
        }

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        // Find today's entry in accessHistory
        let todayEntry = analytics.accessHistory.find((entry) => entry.date === today);

        if (!todayEntry) {
            todayEntry = {
                date: today,
                viewCount: 0,
                downloadCount: 0,
                liveSessionCount: 0,
            };
            analytics.accessHistory.push(todayEntry);
        }

        // Increment counters based on eventType
        switch (eventType) {
            case 'view':
                analytics.viewCount += 1;
                todayEntry.viewCount += 1;
                break;
            case 'download':
                analytics.downloadCount += 1;
                todayEntry.downloadCount += 1;
                break;
            case 'live_session_start':
                analytics.liveSessionCount += 1;
                todayEntry.liveSessionCount += 1;
                break;
        }

        // Save updated analytics
        await analytics.save();

        return NextResponse.json(
            {
                success: true,
                data: {
                    presentationId,
                    eventType,
                    viewCount: analytics.viewCount,
                    downloadCount: analytics.downloadCount,
                    liveSessionCount: analytics.liveSessionCount,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Analytics track error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
