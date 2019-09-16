const User = require('../models/User')
const Profile = require('../models/Profile')

exports.signupForm = (req, res) => {
  res.render('auth/signup')
}

exports.signup = async (req, res) => {
  const {email, password, name, lastname} = req.body

  //console.log(req.body)
  const profile = await Profile.create({})
  User.register(new User({email, profile, name, lastname}), password, function(err, account) {
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
