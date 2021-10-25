import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'

// Route files
import bootcamps from './routes/bootcamps.js';

// DB file
import connectDB from './config/db.js'

// Load env vars
dotenv.config({ path: './config/config.env' });

// Activating database
connectDB()

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
