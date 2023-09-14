import express from 'express'; // for creating express app
import dotenv from 'dotenv'; // for loading environment variables from .env file
import cors from 'cors';  // for enabling CORS
import cookieParser from 'cookie-parser'; // for parsing cookies
import path from 'path'; // for working with file and directory paths
import { fileURLToPath } from 'url'; // for getting file path from url

import sequelize from './db/db.js'; // for connecting to database and creating tables
import setup from './db/setup.js'; // for creating sequences
import seed from './db/seed.js'; // for seeding data
import routes from './routes/routes.js'; // for routing to different endpoints

import { ASCII } from './config/config.js'; // for ASCII art

dotenv.config(); // for loading environment variables from .env file

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express(); // for creating express app

// for parsing request body and cookies from request headers 
app.use(express.json()); // for parsing application/json 
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors({ // for enabling CORS
    origin: [ // for allowing requests from these origins
        process.env.FRONTEND_URL || 'http://localhost:3000',
        'http://localhost:3001'
    ],
    credentials: true // for allowing cookies to be sent from frontend
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // for serving static files
app.use(cookieParser()); // for parsing cookies from request headers

app.use('/api', routes); // for routing to different endpoints


// connect to database and create tables if not exists and start server if success else exit process if error
setup();
sequelize
    .sync()
    // .sync({ alter: true, force: true }) // for creating tables if not exists and alter tables if exists and force: true for dropping tables if exists and creating new tables 
    .then(async () => {
        // if success, log and continue process
        console.log(`${ASCII.bold + ASCII.green}Database connection established${ASCII.reset}`);
        // seed();

        const port = process.env.PORT || 3333;

        // start server
        app.listen(port, () => {
            console.log(`${ASCII.bold + ASCII.blue}Server running on port ${port}${ASCII.reset}`);
        });
    })
    .catch((error) => {
        // if error, log and exit process
        console.log(`${ASCII.bold + ASCII.red}\nDatabase connection failed!${ASCII.reset}`);
        console.log(error);
    });