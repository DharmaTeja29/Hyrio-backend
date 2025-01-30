const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        min: 1000000000,
        max: 9999999999
    },
    email: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    mobileVerified: {
        type: Boolean,
        default: false
    },
    overview: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'company',
        requried: true,
        enum: ['company']
    },
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    }],
    refreshToken: [String]
});

module.exports = mongoose.model('Company', companySchema);