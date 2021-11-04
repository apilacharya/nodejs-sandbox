import dotenv from 'dotenv';
dotenv.config();

export const env = {
  GEOCODER_PROVIDER: process.env.GEOCODER_PROVIDER,
  GEOCODER_API_KEY: process.env.GEOCODER_API_KEY,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
};
