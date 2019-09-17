const User = require('../models/User')
const Profile = require('../models/Profile')
const passport = require('passport')

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
  res.render('auth/login', { action: 'Login' })
}

exports.login = (req, res, next)=>{
  passport.authenticate('local', (err, user)=>{
    req.app.locals.user = user
    req.logIn(user, err =>{
      return res.redirect('/profile')
    } )
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout()
  delete req.app.locals.user
  res.redirect('/auth/login')
}
