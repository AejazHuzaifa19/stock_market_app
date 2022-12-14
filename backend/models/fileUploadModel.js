
const mongoose = require('mongoose')

const fileUploadSchema = mongoose.Schema(
  {
    file:{
        data: Buffer,
        contentType: String,
    },
    filename: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = fileUploadModel =  mongoose.model('upload', fileUploadSchema)