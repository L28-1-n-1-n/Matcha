const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// @route   POST api/users
// @desc    Create a post
// @access  Private

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'Connection error'));
let gfs;
conn.once('open', () => {
  //Init Stream

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create Storage Engine

// const storage = new GridFsStorage({
//   url: db,
//   file: (req, file) => {
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
//   },
// });

/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public/files',
  filename: function (req, file, fn) {
    fn(
      null,
      new Date().getTime().toString() +
        '-' +
        file.fieldname +
        path.extname(file.originalname)
    );
  },
});
//init
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 200000 },
  fileFilter: function (req, file, callback) {
    validateFile(file, callback);
  },
}).single('photo');
var validateFile = function (file, cb) {
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedFileTypes.test(file.mimetype);
  if (extension && mimeType) {
    return cb(null, true);
  } else {
    cb('Invalid file type. Only JPEG, PNG and GIF file are allowed.');
  }
};

// module.exports = upload = multer({ storage });

module.exports = upload;
