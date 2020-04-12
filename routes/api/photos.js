// const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const auth = require('../../middleware/auth');
// const Post = require('../../models/Post');
// const Profile = require('../../models/Profile');
// const Photo = require('../../models/Photo');
// const User = require('../../models/User');
// const multer = require('multer');
// const upload = require('../../upload');
// // @route   POST api/users
// // @desc    Create a post
// // @access  Private

// @route   POST api/users
// @desc    Create a post
// @access  Private

// app.post('/upload', upload.single('file'), (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }
//   const file = req.files.file;
//   console.log(file);
//   file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//     const newPhoto = new Photo({
//       text: 'LOL',
//       fileName: file.name,
//       filePath: `/uploads/${file.name}`,
//     });

//     const photo = newPhoto.save();
//     console.log('photo is :');
//     console.log(photo);
//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });

//     console.log('we are here');

//     // res.json({ file: req.file });
//     console.log('Success!');
//   });
// });

// router.post(
//   '/',
//   auth,
//   upload.single('file'),

//   //   [
//   //     auth,
//   //     [
//   //       check('text', 'Text is required')
//   //         .not()
//   //         .isEmpty()
//   //     ]
//   //   ],
//   async (req, res) => {
//     // const errors = validationResult(req);
//     // if (!errors.isEmpty()) {
//     //   return res.status(400).json({ errors: errors.array() });
//     // }
//     if (req.files === null) {
//       return res.status(400).json({ msg: 'No file uploaded' });
//     }

//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       const file = req.files.file;
//       // file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
//       file.mv(`../../client/public/uploads/${file.name}`, (err) => {
//         if (err) {
//           console.error(err);
//           // return res.status(500).send(err);
//         }
//         // new Photo() is used to create new instance newPhoto from model Photo
//         const newPhoto = new Photo({
//           name: user.name,
//           avatar: user.avatar,
//           user: req.user.id,
//           // text: req.body.text,
//           text: 'LOL',
//           fileName: file.name,
//           filePath: `/uploads/${file.name}`,
//         });

//         // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//         // res.json({ file: req.file });
//         console.log('Success!');
//       });
//       const photo = await newPhoto.save();
//       res.json(photo);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// router.post('/upload', function (req, res) {
//   upload(req, res, (error) => {
//     if (error) {
//       res.redirect('/');
//     } else {
//       if (req.file == undefined) {
//         res.redirect('/');
//       } else {
//         /**
//          * Create new record in mongoDB
//          */
//         var fullPath = 'files/' + req.file.filename;

//         var document = {
//           filePath: fullPath,
//           fileName: req.file.filename,
//         };

//         var photo = new Photo(document);
//         photo.save(function (error) {
//           if (error) {
//             throw error;
//           }
//           res.redirect('/');
//         });
//       }
//     }
//   });
// });

// @route GET api/posts
// @desc Get all posts
// @access Private
// router.get('/', auth, async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ date: -1 }); // latest post first
//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route GET api/posts/:id
// @desc Get post by ID
// @access Private
// router.get('/:id', auth, async (req, res) => {
//   try {
//     const posts = await Post.findById(req.params.id);
//     if (!posts) {
//       return res.stataus(404).json({ msg: 'Post not found' });
//     }

//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Post not found' });
//     }
//     res.status(500).send('Server Error');
//   }
// });

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found ' });
//     }
//     // Check user
//     if (post.user.toString() !== req.user.id) {
//       // toString() required since post.user is an object, but req.user.id is a string
//       return res.status(401).json({ msg: 'User not authorized' });
//     }
//     await post.remove();
//     res.json({ msg: 'Post removed' });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Post not found ' });
//     }
//     res.status(500).send('Server Error');
//   }
// });

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private

// router.put('/like/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     // Check if the post has already been liked by the login user
//     // .filter returns an array of strings where the username of the people who liked the post equals to the loggedin user
//     // if this length is not zero, the current logged in user has liked the post already
//     if (
//       post.likes.filter(like => like.user.toString() === req.user.id).length > 0
//     ) {
//       return res.status(400).json({ msg: 'Post already liked' });
//     }
//     // if the logged in user has not liked the post, add the user to the top of the list of people who have liked the post
//     post.likes.unshift({ user: req.user.id });

//     await post.save();
//     res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route PUT api/posts/unlike/:id
// @desc Unlike a post
// @access Private

// router.put('/unlike/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     // Check if the post has already been liked by the login user
//     // .filter returns an array of strings where the username of the people who liked the post equals to the loggedin user
//     // if this length is not zero, the current logged in user has liked the post already
//     if (
//       post.likes.filter(like => like.user.toString() === req.user.id).length ===
//       0
//     ) {
//       return res.status(400).json({ msg: 'Post has not yet been liked' });
//     }
//     // Get remove index
//     const removeIndex = post.likes
//       .map(like => like.user.toString())
//       .indexOf(req.user.id);
//     post.likes.splice(removeIndex, 1);

//     await post.save();
//     res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route   POST api/users/comment/:id
// @desc    Comment a post
// @access  Private
// router.post(
//   '/comment/:id',
//   [
//     auth,
//     [
//       check('text', 'Text is required')
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await User.findById(req.user.id).select('-password');

//       const post = await Post.findById(req.params.id);

//       const newComment = {
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id
//       };

//       post.comments.unshift(newComment); // put the new comment first

//       await post.save();

//       res.json(post.comments);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private

// router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Pull out comment
//     const comment = post.comments.find(
//       comment => comment.id === req.params.comment_id
//     );

//     // handle case wherer comment does not exist, where the comment_id refer to comment that is already deleted
//     if (!comment) {
//       return res.status(404).json({ msg: 'Commet does not exist' });
//     }

//     // Check that logged in user is trying to delete his own comment, not others
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authroized' });
//     }

//     // Filter comment such that only comments with a different id remains

//     post.comments = post.comments.filter(
//       ({ id }) => id !== req.params.comment_id
//     );
//     await post.save();
//     res.json(post.comments);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Photo = require('../../models/Photo');

const User = require('../../models/User');

const path = require('path');
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
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
const upload = multer({ storage });
// const controller = require('../../controllers/images');
// app.route('/').get(controller.index).post(upload.single("data").controller.create);
// app.route('/:id').get(controller.show).put(controller.update).delete(controller.destroy);

router.get('/', auth, async (req, res) => {
  try {
    const photos = await Photo.find().sort({ date: -1 }); // latest photo first
    res.json(photos);
    console.log('images are:');
    console.log(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// .get(function(req, res) {
//   Img.findOne({}, 'img createdAt', function(err, img) {
//       if (err)
//           res.send(err);
//       // console.log(img);
//       res.contentType('json');
//       res.send(img);
//   }).sort({ createdAt: 'desc' });

router.post('/', auth, upload.single('file'), (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const user = User.findById(req.user.id).select('-password');
  const file = req.files.file;
  console.log(file);
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
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
      text: 'YOYOYO',
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
      // data: fs.readFileSync(`${__dirname}/client/public/uploads/${file.name}`),
      data: fs.readFileSync(path.resolve(uploadsDir, file.name)),
    });
    const photo = newPhoto.save();
    res.json(photo);
  });
});

module.exports = router;
