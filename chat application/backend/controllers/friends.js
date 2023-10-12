const User = require("../modals/ChatUser");
const Friends = require("../modals/Friends");

// Pending: We have to optimise this so that it will find the pattern not compare them
const searchFriend = (req, res) => {
  console.log(req.user);

  const { query } = req.body;
  User.find({ $or: [{ name: query }, { email: query }] })
    .select("name _id email")
    .then((users) => {
      console.log(users);
      res.status(200).json({ success: true, users });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
};

// API: That will create the Friend
const addFriend = async (req, res) => {
  const { friendid } = req.params;
  // 1. check if user with this friendid exist or not
  try {
    const friend = await User.findById(friendid);

    if (!friend) {
      return res
        .status(400)
        .json({ success: false, message: "No user Found by this Id" });
    }
    // 2. Add the the user with friendid in the friendlist
    await Friends.create({ sender: req.user._id, receiver: friendid });

    return res
      .status(200)
      .json({ success: true, message: "Friend Request Sent" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { searchFriend, addFriend };
