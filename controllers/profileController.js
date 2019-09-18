const User = require('../models/User')
const Resource = require('../models/Resource')
const passport = require('passport')

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
//* se agregó user=req.user

exports.addResource = async (req, res) => {
  const { name, url } = req.body
  const user = req.session.currentUser
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


exports.getResourceView = async (req, res) => {
  console.log('usr',req.user.name)
  // const allResources = await Resource.find().populate('creator comments.creator')
  // let userData = ''
  // if (req.user.name) {
  //   const { _id: id } = req.user
  //   userData = { id, login: true }
  // } else {
  //   userData = { id: false, login: false }
  // }
  //console.log(userData);
  const {img} = req.user
  const { resourceid } = req.query
  const resource = await Resource.findById(resourceid).populate({path: 'comments.creator', model: 'User'})
  
  console.log(`resource ${resource}`);
  
  res.render('profile/resource', resource)
  
}

exports.addComment = async (req, res, next) => {
  const { id } = req.params
  
  const { comment } = req.body
  const { originalname: picName, url: picPath } = req.file
  
  const getResource = await Resource.findByIdAndUpdate({ _id: id }, { $push: { comments: { creator: req.user.id, comment, picName, picPath} } })
  res.redirect(`/profile/resource?resourceid=${getResource._id}`)
}
