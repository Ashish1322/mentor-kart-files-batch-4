const multer = require("multer");

const cutomSetting = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.user._id + file.originalname);
  },
});

const upload = multer({ storage: cutomSetting });

module.exports = { upload };
