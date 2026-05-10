import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Analytics from '../../../models/Analytics';
import Presentation from '../../../models/Presentation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { cookies } from 'next/headers';
import { verifyToken } from '../../../lib/auth';

export async function GET(request) {
    try {
        await dbConnect();

        // Get authenticated user
        const session = await getServerSession(authOptions);
        let userId = session?.user?.uid || session?.user?.email;

        if (!userId) {
            const cookieStore = await cookies();
            const token = cookieStore.get('session_token')?.value;
            if (token) {
                const payload = await verifyToken(token);
                if (payload) {
                    userId = payload.uid || payload.email;
                }
            }
        }

        if (!userId) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch all analytics for this user
        const userAnalytics = await Analytics.find({ userId }).sort({ createdAt: -1 });

        // Calculate aggregated stats
        let totalViews = 0;
        let totalDownloads = 0;
        let totalLiveSessions = 0;
        let totalViewMinutes = 0;

        userAnalytics.forEach((analytics) => {
            totalViews += analytics.viewCount;
            totalDownloads += analytics.downloadCount;
            totalLiveSessions += analytics.liveSessionCount;
            totalViewMinutes += analytics.totalViewMinutes;
        });

        // Prepare presentation-level data
        const presentations = userAnalytics.map((analytics) => ({
            id: analytics._id,
            presentationId: analytics.presentationId,
            name: analytics.presentationName,
            views: analytics.viewCount,
            downloads: analytics.downloadCount,
            liveSessions: analytics.liveSessionCount,
            totalViewMinutes: analytics.totalViewMinutes,
            lastViewed: analytics.updatedAt || analytics.createdAt,
            createdAt: analytics.createdAt,
        }));

        // Calculate daily views for chart
        const viewsByDay = {};
        const downloadsByDay = {};
        const liveSessionsByDay = {};

        userAnalytics.forEach((analytics) => {
            analytics.accessHistory.forEach((entry) => {
                if (!viewsByDay[entry.date]) {
                    viewsByDay[entry.date] = 0;
                    downloadsByDay[entry.date] = 0;
                    liveSessionsByDay[entry.date] = 0;
                }
                viewsByDay[entry.date] += entry.viewCount;
                downloadsByDay[entry.date] += entry.downloadCount;
                liveSessionsByDay[entry.date] += entry.liveSessionCount;
            });
        });

        // Convert to arrays for chart
        const chartData = Object.keys(viewsByDay)
            .sort()
            .map((date) => ({
                date,
                views: viewsByDay[date],
                downloads: downloadsByDay[date],
                liveSessions: liveSessionsByDay[date],
            }));

        // Get top presentations (by views)
        const topPresentations = presentations
            .sort((a, b) => b.views - a.views)
            .slice(0, 3);

        // Get most recent presentations (last accessed)
        const recentPresentations = presentations
            .sort((a, b) => new Date(b.lastViewed) - new Date(a.lastViewed))
            .slice(0, 5);

        return NextResponse.json(
            {
                success: true,
                data: {
                    stats: {
                        totalPresentations: presentations.length,
                        totalViews,
                        totalDownloads,
                        totalLiveSessions,
                        totalViewMinutes,
                    },
                    presentations,
                    topPresentations,
                    recentPresentations,
                    charts: {
                        viewsByDay: chartData,
                    },
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Analytics GET error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
