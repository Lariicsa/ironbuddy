const {model, Schema} = require('mongoose')

const resourceSchema = new Schema(
  {
		name: String,
    url: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        creator: {
          ref: 'User',
          type: Schema.Types.ObjectId
        },
        comment: String,
        picPath: String
      }
    ]
  },
  {
    timestamps: {
    //   createdAt: { 
    //     type: Date,
    //     default: Date.now
    // },
      updatedAt: 'updatedAt'
    }
  }
)

module.exports = model('Resource', resourceSchema)