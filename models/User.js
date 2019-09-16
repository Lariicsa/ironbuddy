const {Schema, model} = require('mongoose')
const plm = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    email: String,
		password: String,
		name: String,
		lastname: String,
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    profile: {
      ref: 'Profile',
      type: Schema.Types.ObjectId
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
