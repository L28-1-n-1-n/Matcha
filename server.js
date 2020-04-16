const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');

const bodyParser = require('body-parser');
const path = require('path');
// const crypto = require('crypto');
const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const app = express();
const Photo = require('./models/Photo');
const PORT = process.env.PORT || 5000;

// const upload = require('./upload');
const User = require('./models/User');

const router = express.Router();
const auth = require('./middleware/auth');
const fs = require('fs');
const cors = require('cors');
// const cors = require('./cors');
// cors(app);
const uuidv4 = require('uuid/v4');
// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
// app.use(methodOverride('_method'));

// Working code using fileUpload
app.use(fileUpload());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/public')));
app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/photos', require('./routes/api/photos'));
app.use('/api/confirmation', require('./routes/api/confirmation'));
// var conn = mongoose.connection;
// conn.on('error', console.error.bind(console, 'Connection error'));
// let gfs;
// conn.once('open', () => {
//   //Init Stream

//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
//   // gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
//   console.log(gfs);
// });

// // // Create Storage Engine
// // const storage = new GridFsStorage({ url: db });
// const storage = new GridFsStorage({
//   url: db,
//   file: (req, file) => {
//     //     // const fileInfo = {
//     //     //   filename: file.originalname,
//     //     //   bucketName: 'uploads',
//     //     // };
//     //     // console.log('fileInfo is');
//     //     // console.log(fileInfo);
//     //     // return fileInfo;
//     //     // if (file.mimetype === 'image/jpg') {
//     //     //   console.log('LOLLLL');
//     //     //   return {
//     //     //     bucketName: 'uploads',
//     //     //   };
//     //     // } else {
//     //     //   console.log('seg fault');
//     //     //   return null;
//     //     // }
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         console.log(file.originalname);
//         if (err) {
//           return reject(err);
//         }
//         console.log('buf is :');
//         console.log(buf.toString('hex'));
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         };
//         console.log('filename is :');

//         resolve(fileInfo).then(console.log('kik'));
//         console.log(filename);
//       });
//     });
//     //     // return {
//     //     //   filename: 'file_' + Date.now(),
//     //     // };
//   },
// });

// const upload = multer({ storage });
// console.log('upload is ');
// console.log(upload);
// // app.post('/upload', upload.single('file'), (req, res) => {
// //   res.json({ file: req.file });
// //   console.log('success');
// //   console.log(req.file);
// //   // res.redirect('/');
// // });

// // @route GET /
// // @desc Loads form
// app.get('/', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       res.render('index', { files: false });
//     } else {
//       files.map((file) => {
//         if (
//           file.contentType === 'image/jpeg' ||
//           file.contentType === 'image/png'
//         ) {
//           file.isImage = true;
//         } else {
//           file.isImage = false;
//         }
//       });
//       res.render('index', { files: files });
//     }
//   });
// });

// app.post('/upload', upload.single('file'), (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }

//   const file = req.files.file;
//   console.log('req.files is ');
//   console.log(req.files);
//   // console.log(file);
//   // res.json({ file: req.files.file });
//   console.log('success');
//   console.log(req.file);
//   // res.redirect('/');
// });

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `${__dirname}/client/public/uploads/`);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now());
//   },
// });

// var upload = multer({ storage: storage });

// app.post('/upload', auth, upload.single('file'), (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }
//   const user = User.findById(req.user.id).select('-password');
//   console.log('user.name is: ');
//   console.log(user.name);
//   const file = req.files.file;
//   console.log(file);
//   file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     const newPhoto = new Photo({
//       text: 'LOL',
//       name: user.name,
//       fileName: file.name,
//       filePath: `/uploads/${file.name}`,
//       data: fs.readFileSync(`${__dirname}/client/public/uploads/${file.name}`),
//       contentType: 'image/jpg',
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

// // @route GET /
// // @desc Loads form
// app.get('/', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       res.render('index', { files: false });
//     } else {
//       files.map((file) => {
//         if (
//           file.contentType === 'image/jpeg' ||
//           file.contentType === 'image/png'
//         ) {
//           file.isImage = true;
//         } else {
//           file.isImage = false;
//         }
//       });
//       res.render('index', { files: files });
//     }
//   });
// });

// // @route GET /files
// // @desc  Display all files in JSON
// app.get('/files', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       return res.status(404).json({
//         err: 'No files exist',
//       });
//     }

//     // Files exist
//     return res.json(files);
//   });
// });

// // @route GET /files/:filename
// // @desc  Display single file object
// app.get('/files/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists',
//       });
//     }
//     // File exists
//     return res.json(file);
//   });
// });

// app.post(
//   '/upload',
//   upload.single('file'),

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
//       file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).send(err);
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

//         res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
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

// Working code below

// Upload Endpoint
// app.post('/upload', (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }
//   const file = req.files.file;
//   file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });

// Working code above

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// () => is the callback part
