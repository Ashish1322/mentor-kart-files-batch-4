// import packages
const express = require("express");
const router = express.Router();

// importing controllers
const { sendMessage, fetchAllMessages } = require("../controllers/messages");

// importing middlewares
const { isLoggedIn } = require("../middlewares/general");

router.post("/send-message", isLoggedIn, sendMessage);
router.get("/get-message/:reciever", isLoggedIn, fetchAllMessages);

module.exports = router;
