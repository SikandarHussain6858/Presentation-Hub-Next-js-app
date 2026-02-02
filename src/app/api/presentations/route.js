import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Presentation from '../../../models/Presentation';
import mongoose from 'mongoose';
import { Readable } from 'stream';
import { sendPresentationCode } from '../../../lib/email';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const uniqueCode = searchParams.get('uniqueCode');

        let query = {};
        if (uniqueCode) {
            query.uniqueCode = uniqueCode;
        } else if (userId) {
            query.userId = userId;
        } else {
            return NextResponse.json({ success: false, error: 'UserId or UniqueCode required' }, { status: 400 });
        }

        const presentations = await Presentation.find(query).sort({ createdAt: -1 });

        // Transform to include a download URL
        const data = presentations.map(p => ({
            ...p.toObject(),
            // Create a dynamic valid URL for the frontend to use
            fileUrl: `/api/presentations/download/${p._id}`
        }));

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();

        const formData = await request.formData();
        const file = formData.get('file');
        const userId = formData.get('userId');
        const userEmail = formData.get('userEmail');
        const presentationName = formData.get('presentationName');
        const courseName = formData.get('courseName');

        if (!file || !userId) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Prepare GridFS Bucket
        // Note: mongoose.connection.db is available once connected
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads'
        });

        // 2. Convert File to Buffer/Stream
        const buffer = Buffer.from(await file.arrayBuffer());
        const stream = Readable.from(buffer);

        // 3. Upload Stream to GridFS
        const uploadStream = bucket.openUploadStream(file.name, {
            contentType: file.type || 'application/octet-stream',
            metadata: {
                userId: userId,
                originalName: file.name
            }
        });

        const fileId = await new Promise((resolve, reject) => {
            stream.pipe(uploadStream)
                .on('error', (err) => reject(err))
                .on('finish', () => {
                    resolve(uploadStream.id);
                });
        });

        // 4. Generate Unique Code
        const uniqueCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        // 5. Save Metadata to MongoDB
        const presentation = await Presentation.create({
            userId,
            userEmail,
            presentationName,
            courseName,
            fileName: file.name,
            fileId: fileId,
            uniqueCode,
        });

        // 6. Send email with presentation code
        try {
            await sendPresentationCode(userEmail, presentationName, courseName, uniqueCode);
            console.log('Email sent to:', userEmail);
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // Don't fail the upload if email fails
        }

        return NextResponse.json({
            success: true, data: {
                ...presentation.toObject(),
                fileUrl: `/api/presentations/download/${presentation._id}`
            }
        }, { status: 201 });

    } catch (error) {
        console.error("Upload/DB Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ success: false, error: 'Presentation ID required' }, { status: 400 });
        }

        // Find the presentation first
        const presentation = await Presentation.findById(id);
        
        if (!presentation) {
            return NextResponse.json({ success: false, error: 'Presentation not found' }, { status: 404 });
        }

        // Delete the file from GridFS if it exists
        if (presentation.fileId) {
            const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: 'uploads'
            });
            
            try {
                await bucket.delete(new mongoose.Types.ObjectId(presentation.fileId));
            } catch (error) {
                console.error('Error deleting file from GridFS:', error);
                // Continue even if file deletion fails
            }
        }

        // Delete the presentation document
        await Presentation.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: 'Presentation deleted successfully' });

    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
