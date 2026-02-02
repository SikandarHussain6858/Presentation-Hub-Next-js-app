import mongoose from 'mongoose';

const PresentationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Please provide a user ID for this presentation.'],
        index: true,
    },
    userEmail: {
        type: String,
        required: [true, 'Please provide a user email.'],
    },
    presentationName: {
        type: String,
        required: [true, 'Please provide a presentation name.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    courseName: {
        type: String,
        required: [true, 'Please provide a course name.'],
        maxlength: [60, 'Course cannot be more than 60 characters'],
    },
    fileName: {
        type: String,
        required: true,
    },
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    uniqueCode: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Presentation || mongoose.model('Presentation', PresentationSchema);
