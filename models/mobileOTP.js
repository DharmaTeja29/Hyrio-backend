const mongoose = require('mongoose');
const { Schema } = mongoose;

const mobileOTPSchema = new Schema({
    userId: Schema.Types.ObjectId,
    otp: String,
    createdAt: Date,
    expiresAt: Date
});

module.exports = mongoose.model('MobileOTP', mobileOTPSchema);