const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true,
        enum: ['BEGINNER', 'INTERMEDIATE', 'EXPERT']
    },
    addCandidate: [{
        type: String,
        required: true
    }],
    endDate: {
        type: Date,
        required: true,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
});

module.exports = mongoose.model('Job', jobSchema);