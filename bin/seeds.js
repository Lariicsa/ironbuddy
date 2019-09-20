const mongoose = require('mongoose')
const User = require('../models/User')

const admin = {
  name: 'Anahí',
  lastname: 'Flores',
  email: 'anahi@mail.com', 
  role: 'ADMIN'
}

mongoose
  .connect('mongodb://localhost/ironbuddy', { useNewUrlParser: true })
  .then(async () => {
    const userdata = await User.register(admin, admin.password = 'anahi123')
    console.log(`User created`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })