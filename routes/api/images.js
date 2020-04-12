const path = require('path');
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function(req.file.cb) {
        const uploadsDir = path.join(__dirname, '..', '..', 'client', 'public', 'uploads', `${Date.now}`);
        fs.mkdirSync(uploadsDir)
        cb(null, uploadsDir)
    },
    filename: function(req, file, cb) {
        cb(null, file.originlaname)
    }
});
const upload = multer({ storage });
const controller = require('../../controllers/images');
app.route('').get(controller.index).post(upload.single("data").controller.create);
app.route('').get(controller.show).put(controller.update).delete(controller.destroy);