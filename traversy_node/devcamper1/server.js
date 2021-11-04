import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import errorHandler from './middleware/error.js';
import { env } from './config/env.js';

// Route files
import bootcamps from './routes/bootcamps.js';

// DB file
import connectDB from './config/db.js';

// Activating database
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);

// Dev logging middleware
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

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
