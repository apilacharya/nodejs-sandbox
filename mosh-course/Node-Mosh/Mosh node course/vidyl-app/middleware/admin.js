module.exports = function (req, res, next) {
  // req.user
  if(!req.user.isAdmin) return res.status(403).send('Access denied.')
  // 401 unauthorize
  // 403 forbidden
  next()
}