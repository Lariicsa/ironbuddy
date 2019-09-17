const {Schema, model} = require('mongoose')
const plm = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    name: String,
    email: String,
		password: String,
		lastname: String,
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    profile: {
      ref: 'Resource',
      type: Schema.Types.ObjectId
    },
    img: {
      type: String,
      default: 'https://www.sutterhealth.org/assets/img/dr-profiles/default-dr-profile.png'
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

userSchema.plugin(plm, {usernameField: 'email'})

module.exports = model('User', userSchema)
