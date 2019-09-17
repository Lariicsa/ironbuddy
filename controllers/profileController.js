const User = require('../models/User')
const Resource = require('../models/Resource')

exports.getProfile  = async (req, res) => {
  const user = await User.findById(req.user._id).populate('resource')
  res.render('profile', user)
}

exports.editProfileForm  = async (req, res) => {
  const { userid } = req.query
  const user = await User.findById(userid).populate('resource')
  res.render('profile/edit', user)
}

exports.editProfile = async (req,res ) => {
  const { name, lastname, email, password } = req.body
  const {url: img} = req.file
  const { userid } = req.query
  await User.findByIdAndUpdate(userid, { name, lastname, email, password, img })
  console.log('editprofile',userid)
  res.redirect('/profile')
}

exports.getResource = async (req, res) => {
  const resources = await Resource.find().populate('user')
  const user = req.user
    console.log('usr', user)
  res.render('profile/resources', {resources, user})
}

// router.get("/", isLoggedIn, async(req, res) => {
//   const posts = await Post.find().populate('creator')
//   res.render('index',{ posts } );
// })



exports.addResource = async (req, res) => {
  const { name, url } = req.body
  const user = req.session
  await Resource.create({
    name,
    url,
    user
  })
  res.redirect('/profile/resources')
}

exports.addResourceForm = async (req, res) => {
  res.render('profile/addresources')
}