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

        // Fetch all presentations for this user
        const presentationsDocs = await Presentation.find({
            $or: [{ userId: userId }, { userEmail: userId }]
        }).sort({ createdAt: -1 });
        
        const userAnalytics = await Analytics.find({ userId }).sort({ createdAt: -1 });

        // Calculate aggregated stats
        let totalViews = 0;
        let totalDownloads = 0;
        let totalViewMinutes = 0;

        const analyticsMap = {};
        userAnalytics.forEach((analytics) => {
            analyticsMap[analytics.presentationId.toString()] = analytics;
            totalViews += analytics.viewCount;
            totalDownloads += analytics.downloadCount;
            totalViewMinutes += analytics.totalViewMinutes;
        });

        // Prepare presentation-level data
        const presentations = presentationsDocs.map((p) => {
            const a = analyticsMap[p._id.toString()];
            return {
                id: p._id.toString(),
                presentationId: p._id.toString(),
                name: p.presentationName,
                views: a ? a.viewCount : 0,
                downloads: a ? a.downloadCount : 0,
                totalViewMinutes: a ? a.totalViewMinutes : 0,
                lastViewed: a ? (a.updatedAt || a.createdAt) : p.createdAt,
                createdAt: p.createdAt,
            };
        });

        // Calculate daily views for chart
        const viewsByDay = {};
        const downloadsByDay = {};

        userAnalytics.forEach((analytics) => {
            analytics.accessHistory.forEach((entry) => {
                if (!viewsByDay[entry.date]) {
                    viewsByDay[entry.date] = 0;
                    downloadsByDay[entry.date] = 0;
                }
                viewsByDay[entry.date] += entry.viewCount;
                downloadsByDay[entry.date] += entry.downloadCount;
            });
        });

        // Convert to arrays for chart
        const chartData = Object.keys(viewsByDay)
            .sort()
            .map((date) => ({
                date,
                views: viewsByDay[date],
                downloads: downloadsByDay[date],
            }));

        // Get top presentations (by views)
        const topPresentations = [...presentations]
            .sort((a, b) => b.views - a.views)
            .slice(0, 3);

        // Get most recent presentations (last accessed)
        const recentPresentations = [...presentations]
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
