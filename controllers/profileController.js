const User = require('../models/User')
const Profile = require('../models/Profile')

exports.showProfile = async (req, res) => {
  const user = await User.findById(req.user.id).populate('profile')

  res.render('profile', user)
}
