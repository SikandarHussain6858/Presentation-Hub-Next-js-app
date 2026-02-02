import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/db';
import Presentation from '../../../../../models/Presentation';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
    try {
        await dbConnect();

        // Await params first (Next.js 15+ Requirement)
        const { id } = await params;

        // 1. Get Presentation Metadata to find the fileId
        const presentation = await Presentation.findById(id);

        if (!presentation) {
            return NextResponse.json({ error: 'Presentation not found' }, { status: 404 });
        }

        // Handle Legacy Local Files (Pre-GridFS)
        // These files were saved with a 'fileUrl' path in the database
        if (!presentation.fileId && presentation.fileUrl) {
            return NextResponse.redirect(new URL(presentation.fileUrl, request.url));
        }

        if (!presentation.fileId) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        // 2. Setup GridFS
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads'
        });

        // 3. Open Download Stream
        // We need to return a ReadableStream to the client
        // Node streams are not directly compatible with Web Streams used in NextResponse (server-side interface)
        // So we create a simplified iterator/stream response.

        const downloadStream = bucket.openDownloadStream(presentation.fileId);

        // Convert Node Readable Stream to Web ReadableStream
        const stream = new ReadableStream({
            start(controller) {
                downloadStream.on('data', (chunk) => controller.enqueue(chunk));
                downloadStream.on('end', () => controller.close());
                downloadStream.on('error', (err) => controller.error(err));
            }
        });

        // 4. Return the stream with correct headers for download
        return new NextResponse(stream, {
            headers: {
                'Content-Disposition': `attachment; filename="${presentation.fileName}"`,
                'Content-Type': 'application/octet-stream', // Or store mimeType in DB and use it here
            },
        });

    } catch (error) {
        console.error("Download Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
