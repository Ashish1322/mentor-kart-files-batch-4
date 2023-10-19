// import packages
const express = require("express");
const router = express.Router();

// importing controllers
const {
  searchFriend,
  addFriend,
  giveConnectedFriends,
  fetchPendingRequest,
  accpetFriendRequest,
  rejectFriendRequest,
} = require("../controllers/friends");

// importing middlewares
const { isLoggedIn } = require("../middlewares/general");

// routes

// Route to Search the Freind using email or Name
router.post("/search-friend", isLoggedIn, searchFriend);

// Route to Add the Freind
router.get("/add-friend/:friendid", isLoggedIn, addFriend);

// get all connected friends
router.get("/all-friends", isLoggedIn, giveConnectedFriends);

// give you all pending request
router.get("/all-pending", isLoggedIn, fetchPendingRequest);

// accept the Friend Request
router.get("/accept-request/:docid", isLoggedIn, accpetFriendRequest);

// Reject the Frind Request
router.get("/reject-request/:docid", isLoggedIn, rejectFriendRequest);

module.exports = router;
