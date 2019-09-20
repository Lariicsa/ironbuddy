const User = require('../models/User')
const Resource = require('../models/Resource')
const passport = require('passport-local-mongoose')


exports.getProfile  = async (req, res) => {
  const user = await User.findById(req.user._id).populate('resource')
  //console.log(user)
  res.render('profile', user)
}

exports.editProfileForm  = async (req, res, next) => {
  const { userid } = req.query
  const user = await User.findById(userid).populate('resource')
  res.render('profile/edit', user)
}

exports.editProfile = async (req, res, next) => {
 
  const { name, lastname, password} = req.body
  const { userid } = req.query
  if (password) await user.setPassword(req.user.password)
  

/*   if (password) await User.setPassword(password, (err,user) =>{
    if (err){
      res.json({success: false, message: 'Password could not be saves. Please try again!'})
    }else{
      res.json({sucess: true, message: 'Your new password has been saved'})
    }
  }) */
  if (!req.file) {
    await User.findByIdAndUpdate(userid, { name, lastname, password })
  } else {
    const { url: img } = req.file
    await User.findByIdAndUpdate(userid, { name, lastname, password, img })
    req.app.locals.user.img = img
  }
  res.redirect('/profile')
}

exports.getResource = async (req, res) => {
  const resources = await Resource.find().populate('user')
  const user = req.user //* se agregó user=req.user
  res.render('profile/resources', {resources, user})
}

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
  const { resourceid } = req.query
  const resource = await Resource.findById(resourceid).populate({path: 'comments.creator', model: 'User'})
  resource.user = req.user  
  res.render('profile/resource', resource)
  
}

exports.addComment = async (req, res, next) => {
  const { id } = req.params
  
  const { comment } = req.body
  const { originalname: picName, url: picPath } = req.file
  
  const getResource = await Resource.findByIdAndUpdate({ _id: id }, { $push: { comments: { creator: req.user.id, comment, picName, picPath} } })
  res.redirect(`/profile/resource?resourceid=${getResource._id}`)
}

exports.deleteResource = async (req, res) => {
  const {resourceid} = req.params//query
  await Resource.findByIdAndDelete(resourceid)
  res.redirect('/profile/resources')
}





