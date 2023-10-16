const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    prompt: {
        type: String,
        // required: true
    },
    ip: {
        type: String
    },
    originalImageLink: {
        type: String,
        // required: true
    },
    generatedImageLink: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
});

module.exports = mongoose.model('queue', QueueSchema);

