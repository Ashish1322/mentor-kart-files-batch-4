const express = require("express");

const router = express.Router();

// import middlewares
const { checkBodyParams } = require("../midllewares/genera");

// import controllers
// import controllers
const {
  signup,
  login,
  activateAccount,
  sendForgetPasswordLink,
  hanldePasswordUpdateDetials,
} = require("../controllors/authentication");

// STEP 1:  Singup ( POST )
router.post("/signup", checkBodyParams, signup);

// Send The Actiovation Link
router.get("/activate-account/:token", activateAccount);

// STEP 2: LOGIN ( POST )
router.post("/login", login);

// Forget Password Send Link
router.post("/forget-password", sendForgetPasswordLink);

// Hanlde the forget password request
router.post("/handle-update-password", hanldePasswordUpdateDetials);

module.exports = router;
