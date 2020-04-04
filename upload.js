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
conn.once('open', () => {
  //Init Stream

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create Storage Engine

const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
export const upload = multer({ storage });
