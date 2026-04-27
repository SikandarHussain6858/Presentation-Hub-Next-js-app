import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    presentationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Presentation',
        required: [true, 'Please provide a presentation ID.'],
        index: true,
    },
    presenterId: {
        type: String,
        required: [true, 'Please provide a presenter ID.'],
        index: true,
    },
    code: {
        type: String,
        required: [true, 'Please provide a session code.'],
        unique: true,
        index: true,
    },
    status: {
        type: String,
        enum: ['active', 'ended'],
        default: 'active',
    },
    currentSlide: {
        type: Number,
        default: 0,
        min: 0,
    },
    participantCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    viewers: [
        {
            type: String, // userId of viewer
        },
    ],
    annotations: [
        {
            slideIndex: Number,
            timestamp: Date,
            drawing: {
                x: Number,
                y: Number,
                color: String,
                size: Number,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    endedAt: {
        type: Date,
        default: null,
    },
});

// Compound index for fast queries
SessionSchema.index({ presentationId: 1, status: 1 });
SessionSchema.index({ presenterId: 1, status: 1 });

export default mongoose.models.Session || mongoose.model('Session', SessionSchema);
