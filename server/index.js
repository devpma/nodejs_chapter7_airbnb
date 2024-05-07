const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const connectWithDB = require('./config/db');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

const app = express();

connectWithDB(); // 디비 연결
cloudinary.config({
    cloud_name: process.env.ClOUDINARY_NAME,
    api_key: process.env.ClOUDINARY_API_KEY,
    api_secret: process.env.ClOUDINARY_API_SCRECT,
})


app.use(cookieParser());

app.use(cookieSession({
    name: 'session',
    maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
    sameSite: 'none'
}))

app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    Credential: true
}));

app.use('/' , require('./routes'));

app.listen(process.env.PORT || 8000, (err) => {
    if (err) {
        console.log('Error in connecting to server: ' + err);
    }

    console.log(`Server is running on port ${process.env.PORT}`)
})