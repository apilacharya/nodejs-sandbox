import express from 'express';
import path from 'path';
import morgan from 'morgan';
import colors from 'colors';
import errorHandler from './middleware/error.js';
import { env } from './config/env.js';
import fileupload from 'express-fileupload';
import cookieParser from 'cookie-parser';

// Route files
import bootcamps from './routes/bootcamps.js';
import courses from './routes/courses.js';
import auth from './routes/auth.js';

// DB file
import connectDB from './config/db.js';

// Activating database
connectDB();

const __dirname = path.resolve();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// File uploading
app.use(fileupload());

app.use(cookieParser());

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use(errorHandler);

// Dev logging middleware
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and end process
  server.close(() => process.exit(1));
});
