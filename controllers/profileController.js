const User = require('../models/User')
const Resource = require('../models/Resource')

exports.getProfile  = async (req, res) => {
  const user = await User.findById(req.user._id).populate('resource')
  console.log(user)
  res.render('profile', user)
}

exports.editProfileForm  = async (req, res) => {
  const { userid } = req.query
  const user = await User.findById(userid).populate('resource')
  console.log(user)
  res.render('profile/edit', user)
}

exports.editProfile = async (req,res ) => {
  const { name, lastname, email, password } = req.body
  const { userid } = req.query
  await User.findByIdAndUpdate(userid, { name, lastname, email, password })
  console.log(userid)
  res.redirect('/profile')
}
