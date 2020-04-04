const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');

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

const app = express();

const PORT = process.env.PORT || 5000;
// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
app.use(methodOverride('_method'));

app.use(fileUpload());

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/photos', require('./routes/api/photos'));

// var conn = mongoose.connection;
// conn.on('error', console.error.bind(console, 'Connection error'));
// conn.once('open', () => {
//   //Init Stream

//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Create Storage Engine

// const storage = new GridFsStorage({
//   url: db,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });

// app.post('/upload', upload.single('file'), (req, res) => {
//   console.log('we are here');
//   res.json({ file: req.file });
//   res.redirect('/');
//   console.log('Success!');
// });

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// () => is the callback part
