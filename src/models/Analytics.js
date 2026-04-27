import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
    presentationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Presentation',
        required: [true, 'Please provide a presentation ID.'],
        index: true,
    },
    userId: {
        type: String,
        required: [true, 'Please provide a user ID.'],
        index: true,
    },
    presentationName: {
        type: String,
        required: [true, 'Please provide a presentation name.'],
    },
    viewCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    downloadCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    liveSessionCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    totalViewMinutes: {
        type: Number,
        default: 0,
        min: 0,
    },
    accessHistory: [
        {
            date: {
                type: String, // Format: "2024-01-15"
                required: true,
            },
            viewCount: {
                type: Number,
                default: 0,
            },
            downloadCount: {
                type: Number,
                default: 0,
            },
            liveSessionCount: {
                type: Number,
                default: 0,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Compound index for fast queries by user and presentation
AnalyticsSchema.index({ userId: 1, presentationId: 1 });

// Update updatedAt on save
AnalyticsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
