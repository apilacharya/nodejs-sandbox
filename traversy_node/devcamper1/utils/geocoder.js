import NodeGeocoder from 'node-geocoder';
import { env } from '../config/env.js';

const options = {
  provider: env.GEOCODER_PROVIDER,
  apiKey: env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
