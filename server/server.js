require('dotenv').config();
require('./config/mongoose.config');

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const cookieParser = require("cookie-parser");

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/user.routes')
userRoutes(app);

// Start server
app.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});