const {model, Schema} = require('mongoose')

const profileSchema = new Schema(
  {
    name: String,
    img: {
      type: String,
      default: 'https://www.sutterhealth.org/assets/img/dr-profiles/default-dr-profile.png'
    }
  },
  {}
)

module.exports = model('Profile', profileSchema)