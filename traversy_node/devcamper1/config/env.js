import dotenv from 'dotenv';
dotenv.config();

export const env = {
  GEOCODER_PROVIDER: process.env.GEOCODER_PROVIDER,
  GEOCODER_API_KEY: process.env.GEOCODER_API_KEY,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  FILE_UPLOAD_PATH: process.env.FILE_UPLOAD_PATH,
  MAX_FILE_UPLOAD: process.env.MAX_FILE_UPLOAD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
};
