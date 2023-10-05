// importing Packages
const User = require("../modals/ChatUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;
  // check if data is valid
  if (!email || !password)
    return res.status(401).json({ success: false, message: "Invalid Data" });

  // check if user exists or not
  User.findOne({ email: email })
    .then((user) => {
      // check if user exists
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Invalid Email" });

      // check the password
      bcrypt.compare(password, user.password, function (err, result) {
        // correct password
        if (result) {
          // sign the token
          const token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
            },
            "ABC1234"
          );

          // send this token to user
          return res
            .status(200)
            .json({ success: true, message: "Logged In Success", token });
        }
        // incorrect password
        else {
          return res
            .status(401)
            .json({ success: false, message: "Invalid  Password" });
        }
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "Something Went Wrong : " + err.message,
      })
    );
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  // check if data is valid
  if (!email || !password || !name)
    return res.status(401).json({ success: false, message: "Invalid Data" });

  try {
    // check if the user already exist with provided email
    const user = await User.findOne({ email: email });
    if (user)
      return res.status(401).json({
        success: false,
        message: "Account with this email already exists!",
      });

    const hashPasword = bcrypt.hashSync(password, 10);

    await User.create({ name, email, password: hashPasword });

    res.status(200).json({ success: true, message: "Account Created" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong : " + err.message,
    });
  }
};

module.exports = { login, signup };
