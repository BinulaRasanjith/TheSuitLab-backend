import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import sequelize from './config/db.js'; // for connecting to database

import routes from './routes/routes.js'; // for routing

import { ASCII } from './config/config.js';

dotenv.config(); // for loading environment variables from .env file

const app = express(); // for creating express app



app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
})); // for enabling CORS
app.use(cookieParser()); // for parsing cookies

app.use('/api', routes); // for routing


// connect to database
sequelize
    .sync({alter: true})
    .then(() => {
        // if success, log and continue process
        console.log(`${ASCII.green}\nDatabase connection established!${ASCII.reset}`);

        const port = process.env.PORT || 3333;

        // start server
        app.listen(port, () => {
            console.log(`${ASCII.bold + ASCII.blue}Server running on port ${port}${ASCII.reset}\n`);
        });
    })
    .catch((error) => {
        // if error, log and exit process
        console.log(`${ASCII.bold + ASCII.red}\nDatabase connection failed!${ASCII.reset}`);
        console.log(error);
    });