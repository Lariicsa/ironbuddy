const mongoose = require('mongoose')
const User = require('../models/User')

const admin = {
  name: 'Anahí',
  lastname: 'Flores',
  email: 'anahi@ironhack.com', 
  role: 'ADMIN'
}

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(async () => {
    User.register(admin, admin.password = 'anahi123')
    console.log(`User created`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })