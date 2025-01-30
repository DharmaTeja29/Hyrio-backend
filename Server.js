require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn.js');
const corsOptions = require('./config/corsOrigins.js');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT.js');
const PORT = process.env.PORT || 3500;

connectDB();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('^/', require('./routes/user'));

app.use(verifyJWT);

app.use('/company', require('./routes/company'));

app.all('*', (req, res) => {
    res.status(404).json({ 'message': 'PAGE-NOT-FOUND' });
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ 'message': err.message });
});

mongoose.connection.once('open', () => {
    console.log('mongodb connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});