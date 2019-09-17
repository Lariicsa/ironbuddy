const User = require('../models/User')
const Resource = require('../models/Resource')

exports.signupForm = (req, res) => {
  res.render('auth/signup')
}

exports.signup = async (req, res) => {
  const {email, password, name, lastname} = req.body

  console.log(req.body)
  //const resource = await Resource.create({})
  User.register(new User({email, name, lastname}), password, function(err, account) {
    if (err) {
      return res.json(err)
    }
    return res.redirect('/auth/login')
  })
}


exports.loginForm = (req, res) => {
  res.render('auth/login')
}

exports.login = (req, res) => {
  res.redirect('/profile')
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/auth/login')
}
