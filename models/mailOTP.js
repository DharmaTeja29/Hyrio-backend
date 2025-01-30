const mongoose = require('mongoose');
const { Schema } = mongoose;

const mailOTPSchema = new Schema({
    userId: Schema.Types.ObjectId,
    otp: String,
    createdAt: Date,
    expiresAt: Date
});

module.exports = mongoose.model('MailOTP', mailOTPSchema);