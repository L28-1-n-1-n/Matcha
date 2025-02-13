const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  bday: {
    day: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      require: true,
    },
  },
  location: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  age: {
    type: Number,
  },
  bio: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  interestedGender: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  fame: {
    type: Number,
    default: 0,
  },
  distance: {
    type: Number,
    default: 0,
  },
  maxCommonTags: {
    type: Number,
    default: 0,
  },
  likes: [
    // likes which users' photos
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  likedBy: [
    // photos liked by which users
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  checkedOut: [
    // Clicked on which users' profile
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  checkedOutBy: [
    // profile clicked by which users
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  matches: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  correspondances: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      name: {
        type: String,
      },
    },
  ],
  blocked: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  blockedBy: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  onlineNow: {
    type: String,
    default: 'No',
  },
  lastOnline: {
    type: Date,
    default: Date.now,
  },
  fakeVote: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  ageStarts: {
    type: Number,
  },
  ageEnds: {
    type: Number,
  },
  preferredTags: {
    type: [String],
  },
  preferredLocation: {
    type: String,
  },
  preferredDistance: {
    type: Number,
  },
  fameStarts: {
    type: Number,
  },
  fameEnds: {
    type: Number,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
// company: {
//   type: String,
// },
// website: {
//   type: String,
// },
// status: {
//   type: String,
//   required: true,
// },
// skills: {
//   type: [String],
//   required: true,
// },
// githubusername: {
//   type: String,
// },
// experience: [
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     company: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//     },
//     from: {
//       type: Date,
//       required: true,
//     },
//     to: {
//       type: Date,
//     },
//     current: {
//       type: Boolean,
//       default: false,
//     },
//     description: {
//       type: String,
//     },
//   },
// ],
// education: [
//   {
//     school: {
//       type: String,
//       required: true,
//     },
//     degree: {
//       type: String,
//       required: true,
//     },
//     fieldofstudy: {
//       type: String,
//       required: true,
//     },
//     from: {
//       type: Date,
//       required: true,
//     },
//     to: {
//       type: Date,
//     },
//     current: {
//       type: Boolean,
//       default: false,
//     },
//     description: {
//       type: String,
//     },
//   },
// ],
// social: {
//   youtube: {
//     type: String,
//   },
//   twitter: {
//     type: String,
//   },
//   facebook: {
//     type: String,
//   },
//   linkedin: {
//     type: String,
//   },
//   instagram: {
//     type: String,
//   },
// },
// date: {
//   type: Date,
//   default: Date.now,
// },
