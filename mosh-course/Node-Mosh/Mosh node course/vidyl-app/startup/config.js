require('dotenv').config();

module.exports = function () {
if (!process.env.jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
}