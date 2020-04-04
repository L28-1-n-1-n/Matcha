const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    mongoose.set('useUnifiedTopology', true);
    // mongoose.set('useFindAndModify', false);

    let gfs;

    await // Work around deprecated Server settings
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB connected...');

    // var conn = mongoose.connection;
    // conn.on('error', console.error.bind(console, 'Connection error'));
    // conn.once('open', () => {
    //   //Init Stream
    //   gfs = Grid(conn.db, mongoose.mongo);
    //   gfs.collection('uploads');
    // });

    // // Create Storage Engine

    // const storage = new GridFsStorage({
    //   url: mongoURI,
    //   file: (req, file) => {
    //     return new Promise((resolve, reject) => {
    //       crypto.randomBytes(16, (err, buf) => {
    //         if (err) {
    //           return reject(err);
    //         }
    //         const filename =
    //           buf.toString('hex') + path.extname(file.originalname);
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
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
