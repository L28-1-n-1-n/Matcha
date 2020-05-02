const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  isProfilePic: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
  },
  firstname: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    // liked by which users
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  //   comments: [
  //     // commented by which users
  //     {
  //       user: {
  //         type: Schema.Types.ObjectId,
  //         ref: 'users'
  //       },
  //       text: {
  //         type: String,
  //         required: true
  //       },
  //       firstname: {
  //         type: String
  //       },
  //       date: {
  //         type: Date,
  //         default: Date.now
  //       }
  //     }
  //   ],
  date: {
    type: Date,
    default: Date.now,
  },
  fileName: {
    type: String,
  },
  filePath: {
    type: String,
  },
  data: {
    type: Buffer,
  },
});

module.exports = Photo = mongoose.model('photo', PhotoSchema);
