// importing Packages
const User = require("../modals/ChatUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

      // check if user is verified or not
      if (user.verified == false)
        return res
          .status(401)
          .json({ success: false, message: "Please verify your email !" });
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
          return res.status(200).json({
            success: true,
            message: "Logged In Success",
            token,
            name: user.name,
            _id: user._id,
            profilePic: user.profilePic,
          });
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
    if (user) {
      // if he is veried
      return res.status(401).json({
        success: false,
        message: "Account with this email already exists!",
      });
    }

    const hashPasword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({ name, email, password: hashPasword });

    // sign the token
    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      "VERFYEMAIL1233"
    );

    // sending the mail
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "a.m2001nov@gmail.com",
        pass: "aptz zbky ebnx cxxg",
      },
    });

    let mailDetails = {
      from: "a.m2001nov@gmail.com",
      to: newUser.email,
      subject: "Activate Your GupSup Account !",
      html: `
      <h1> Welcome in GupShup Family ! </h1>
      <p> We are happy to onboard you </p>
      <a href="http://127.0.0.1:8000/auth/activate-account/${token}"> Click here to verify the email </a>
      `,
    };

    await mailTransporter.sendMail(mailDetails);

    res.status(200).json({
      success: true,
      message: "Account activation link has been sent on your email",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong : " + err.message,
    });
  }
};

const activateAccount = async (req, res) => {
  const token = req.params.token;
  try {
    const data = jwt.verify(token, "VERFYEMAIL1233");

    await User.findByIdAndUpdate(data._id, { verified: true });
    res.redirect("http://127.0.0.1:5173/");
  } catch (err) {
    res.json({ success: false, message: "Link Expired" });
  }
};

const uploadProfilPic = async (req, res) => {
  let profilePic = `http://localhost:8000/uploads/${req.file.filename}`;
  // console.log(`http://localhost:8000/static/${req.file.filename}`);
  await User.findByIdAndUpdate(req.user._id, {
    profilePic: profilePic,
  });

  return res.json({ success: true, message: "File Uploaded", profilePic });
};

module.exports = { login, signup, activateAccount, uploadProfilPic };
