const log = function (req,res, next){
  console.log('Logging...') 
  next()
}


const authenticate = function authenticate(req, res, next) {
  console.log('Authenticating...')
  next()
}

module.exports = {
  log,
  authenticate
}