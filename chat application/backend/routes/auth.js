// import packages
const express = require("express");
const router = express.Router();

// importing controllers
const {
  login,
  signup,
  activateAccount,
  uploadProfilPic,
} = require("../controllers/auth");

// importing middlewares
const { upload } = require("../middlewares/multer");

router.post("/login", login);
router.post("/signup", signup);
router.get("/activate-account/:token", activateAccount);
router.post(
  "/upload/profile-pic",
  upload.single("profilepic"),
  uploadProfilPic
);
module.exports = router;
