const {model, Schema} = require('mongoose')

const resourceSchema = new Schema(
  {
		name: String,
    url: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

module.exports = model('Resource', resourceSchema)