const bcrypt = require('bcrypt')

// 1234 -> abch
async function run() {
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash('1233', salt)
console.log(salt)
console.log(hashed)
}
run()