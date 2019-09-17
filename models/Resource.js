const {model, Schema} = require('mongoose')

const resourceSchema = new Schema(
  {
		name: String,
		url: String,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

module.exports = model('Resource', resourceSchema)