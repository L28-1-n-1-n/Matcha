const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Photo = require('../../models/Photo');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const path = require('path');
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body);
    const uploadsDir = path.join(
      __dirname,
      '..',
      '..',
      'client',
      'public',
      'uploads'
    );
    // fs.mkdirSync(uploadsDir)
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originlaname);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1000 * 1000 }, //5MB per photo
  fileFilter: function (req, file, callback) {
    validateFile(file, callback);
  },
});
// unfortunately this does not work
var validateFile = function (file, cb) {
  allowedFileTypes = /jpeg|jpg|png/;
  const extension = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedFileTypes.test(file.mimetype);
  if (extension && mimeType) {
    return cb(null, true);
  } else {
    cb('Invalid file type. Only JPEG, JPG and PNG file are allowed.');
  }
};

// @route   GET api/photo
// @desc    Get all photos
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const photos = await Photo.find()
      .populate('profile', [
        '_id',
        'user',
        'location',
        'bday',
        'bio',
        'gender',
        'interestedGender',
        'tags',
        'fame',
        'likes',
        'likedBy',
        'checkedOut',
        'checkedOutBy',
      ])
      .sort({ date: -1 }); // latest photo first

    console.log(photos[0].profile.location.city);
    res.json(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/photo/filteredMatches
// @desc    Get profile pics of profiles that fit the user's criteria
// @access  Private
router.get('/filteredMatches', auth, async (req, res) => {
  try {
    const photos = await Photo.find()
      .populate('profile', [
        '_id',
        'user',
        'location',
        'bday',
        'bio',
        'gender',
        'interestedGender',
        'tags',
        'fame',
        'likes',
        'likedBy',
        'checkedOut',
        'checkedOutBy',
      ])
      .sort({ date: -1 }); // latest photo first
    const myProfile = await Profile.findOne({ user: req.user.id });
    console.log(req.user.id);
    console.log(myProfile.ageStarts);
    console.log(myProfile.ageEnds);
    if (!myProfile) {
      return res.status(400).json({ msg: ' Profile not found' });
    }

    //     ageStarts: '',
    // ageEnds: '',
    // preferredTags: '',
    // preferredLocation: '',
    // preferredDistance: '',
    // fameStarts: '',
    // fameEnds: '',

    const findAge = (photo) => {
      let age;
      var dateObj = new Date();
      age = dateObj.getUTCFullYear() - photo.profile.bday.year;
      var month = dateObj.getUTCMonth() + 1 - photo.profile.bday.month; //months from 1-12
      var day = dateObj.getUTCDate() - photo.profile.bday.day;
      return (age = month < 0 ? age - 1 : day < 0 ? age - 1 : age);
    };

    if (photos) {
      ProfilePics = photos.filter((photo) => photo.profile);
    }
    console.log(ProfilePics.length);
    if (ProfilePics && myProfile) {
      ProfilePics = ProfilePics.filter(
        (photo) =>
          photo.profile &&
          photo.isProfilePic == true &&
          photo.profile._id !== myProfile._id
      );
    }
    console.log(ProfilePics.length);
    console.log(myProfile.ageStarts);
    if (ProfilePics) {
      ProfilePics = ProfilePics.filter(
        (photo) =>
          photo.profile.bday &&
          findAge(photo) >= myProfile.ageStarts &&
          findAge(photo) <= myProfile.ageEnds
      );
    }
    console.log(ProfilePics);
    res.json(ProfilePics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/photo/me
// @desc    Get current user's photos by his/her userid
// @access  Private
router.get('/me', auth, async (req, res) => {
  // endpoint is '/me', not '/'
  try {
    // find user by its objectid
    // populate the user with firstname and avatar
    const photo = await Photo.find({
      user: req.user.id,
      // }).populate('user', ['firstname', 'avatar']);
    });
    // console.log(photo);
    if (!photo) {
      return res
        .status(400)
        .json({ msg: ' No photos found. Try uploading some !' });
    }
    res.json(photo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/photos/${userId}/all
// @desc    Get current user's profile pic by his/her userid
// @access  Private
router.get('/:id/all', auth, async (req, res) => {
  try {
    // find user by its objectid
    // populate the user with firstname and avatar
    const photos = await Photo.find({
      user: req.params.id,
      // isProfiePic: true,
      // }).populate('user', ['firstname', 'avatar']);
    });

    if (!photos) {
      return res
        .status(400)
        .json({ msg: ' No photos found. Try uploading some !' });
    }
    res.json(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/photo/${userId}/profilepic
// @desc    Get current user's profile pic by his/her userid
// @access  Private
router.get('/:id/profilepic', auth, async (req, res) => {
  // endpoint is '/me', not '/'
  try {
    // find user by its objectid
    // populate the user with firstname and avatar
    const photo = await Photo.find({
      user: req.params.id,
      // isProfiePic: true,
      // }).populate('user', ['firstname', 'avatar']);
    });

    if (!photo) {
      return res
        .status(400)
        .json({ msg: ' No photos found. Try uploading some !' });
    }
    res.json(photo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// const io = require('../../server').io;
router.post('/', auth, upload.single('file'), async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const user = await User.findById(req.user.id).select('-password');

  let profile = await Profile.findOne({ user: req.user.id });
  const file = req.files.file;

  const uploadsDir = path.join(
    __dirname,
    '..',
    '..',
    'client',
    'public',
    'uploads'
  );
  console.log(uploadsDir);
  console.log(path.resolve(uploadsDir, file.name));
  file.mv(path.resolve(uploadsDir, file.name), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    // new Photo() is used to create new instance newPost from model Photo
    const newPhoto = new Photo({
      firstname: user.firstname,
      avatar: user.avatar,
      user: req.user.id,
      profile: profile.id,
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
      // data: fs.readFileSync(`${__dirname}/client/public/uploads/${file.name}`),
      data: fs.readFileSync(path.resolve(uploadsDir, file.name)),
    });
    const photo = newPhoto.save();
    res.json(photo);
    console.log(photo);
    // io.on('connection', (socket) => {
    //   console.log('New WS Connection 222...');
    //   console.log('socket connected with id:' + socket.id);
    //   console.log(newPhoto.fileName);
    //   socket.emit('message', 'we are here');
    //   socket.emit('message', newPhoto.fileName);
    // });
  });
});

// @route PUT api/photos/like/:id
// @desc Like a post
// @access Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (
      photo.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Photo already liked' });
    }
    // if the logged in user has not liked the post, add the user to the top of the list of people who have liked the post
    photo.likes.unshift({ user: req.user.id });

    await photo.save();
    res.json(photo.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/photos/likedby/:id
// @desc Like a post
// @access Private

router.put('/likedby/:id', auth, async (req, res) => {
  console.log('here');
  try {
    const photo = await Photo.findById(req.params.id);
    const target_profile = await Profile.findById(photo.profile.toString());
    if (!target_profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    if (
      photo.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0 &&
      target_profile.likedBy.filter(
        (entry) => entry.user.toString() === req.user.id
      ).length === 0
    ) {
      target_profile.likedBy.unshift({ user: req.user.id });
      console.log('new entry added');
    } else {
      return res.status(400).json({ msg: 'Photo already liked' });
    }

    await target_profile.save();
    // res.json(target_profile.checkedOutBy);

    res.json(target_profile.likedBy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/posts/unlike/:id
// @desc Unlike a post
// @access Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    // Check if the post has already been liked by the login user
    // .filter returns an array of strings where the username of the people who liked the post equals to the loggedin user
    // if this length is not zero, the current logged in user has liked the post already
    if (
      photo.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Photo not yet liked' });
    }
    // Get remove index
    const removeIndex = photo.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    photo.likes.splice(removeIndex, 1);

    await photo.save();
    res.json(photo.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/photos/:id
// @desc Delete a photo
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({ msg: 'Photo not found ' });
    }
    // Check user
    if (photo.user.toString() !== req.user.id) {
      // toString() required since photo.user is an object, but req.user.id is a string
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await photo.remove();
    res.json({ msg: 'Photo removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Photo not found ' });
    }
    res.status(500).send('Server Error');
  }
});

// @route PUT api/photos/isProfilePic/:id
// @desc Make a photo profilepic
// @access Private

router.put('/isProfilePic/:id', auth, async (req, res) => {
  try {
    const photos = await Photo.find({
      user: req.user.id,
    });
    if (!photos) {
      return res
        .status(400)
        .json({ msg: ' No photos found. Try uploading some !' });
    }

    console.log('req.params.id is');
    console.log(req.params.id);
    photos.map(async (photo) => {
      console.log(photo._id);
      console.log(req.params.id);
      photo._id == req.params.id
        ? (photo.isProfilePic = true)
        : (photo.isProfilePic = false);

      await photo.save();

      res.json(photo.isProfiePic);
    });

    // Check if the post has already been liked by the login user
    // .filter returns an array of strings where the username of the people who liked the post equals to the loggedin user
    // if this length is not zero, the current logged in user has liked the post already
    // if (
    //   photo.likes.filter((like) => like.user.toString() === req.user.id)
    //     .length > 0
    // ) {
    //   return res.status(400).json({ msg: 'Photo already liked' });
    // }
    // if the logged in user has not liked the post, add the user to the top of the list of people who have liked the post
    // photo.isProfilePic = true;

    // await photo.save();
    // res.json(photo.isProfilePic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT /api/photos/clicked/${targetID}/${myID}
// @desc Adding to database of target user that the logged-in user has checked out his/her profile
// @access Private
router.put(`/clicked/:targetProfileID/:myUserID`, auth, async (req, res) => {
  try {
    const target_profile = await Profile.findById(req.params.targetProfileID);
    if (!target_profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    if (
      target_profile.checkedOutBy.filter(
        (entry) => entry.user.toString() === req.params.myUserID
      ).length === 0
    ) {
      target_profile.checkedOutBy.unshift({ user: req.params.myUserID });
      console.log('new entry added');
    }
    await target_profile.save();
    res.json(target_profile.checkedOutBy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
