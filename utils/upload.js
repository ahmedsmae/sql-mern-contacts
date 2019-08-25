const multer = require('multer');

const upload = multer({
  dest: 'uploads',
  limits: {
    fileSize: 5000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/i)) {
      // $ = end of name
      // i = case insensitive
      return cb(new Error('Please upload a CSV file'));
    }

    cb(undefined, true);
  }
});

module.exports = upload;
