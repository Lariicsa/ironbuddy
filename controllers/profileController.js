const User = require('../models/User')
const Resource = require('../models/Resource')

exports.showProfile  = async (req, res) => {
  const user = await User.findById(req.user._id).populate('resource')
  console.log(user)
  res.render('profile', user)
}





