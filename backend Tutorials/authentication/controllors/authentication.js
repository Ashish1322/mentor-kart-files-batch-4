const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/user");

const signup = (req, res) => {
  const { email, password, name } = req.body;

  // 1. If Account with this email already exists
  User.findOne({ email: req.body.email })
    .then((user) => {
      // If Email exist return the response from here only
      if (user) {
        return res.json({ success: false, message: "Email Already in Use!" });
      }
      // if email is new then first we will has the password
      bcrypt.hash(password, 10, (err, has) => {
        if (err) {
          return res.json({ success: false, message: err.message });
        }

        // Create User in database
        User.create({ email: email, name: name, password: has })
          .then((user) => {
            // if account is created successfully then sent an account activation email

            // generate token
            const token = jwt.sign({ _id: user._id }, "12345", {
              expiresIn: 30 * 30,
            });

            // send this tokne on email
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "a.m2001nov@gmail.com",
                pass: "aptz zbky ebnx cxxg",
              },
            });

            var mailOptions = {
              from: "a.m2001nov@gmail.com",
              to: user.email,
              subject: "Activate Your Account Todo",
              html: `
                <p> Hey ${user.name}, Welcome in Todo App. Your Account has been created. In order to use your accouant you 
                have to veify your email by clicking on following link </p>
              
                <a style="padding:10px; background-color: dodgerblue" href="http://localhost:3001/auth/activate-account/${token}"> Activate Account </a>
                `,
            };

            // sending email
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                return res.json({ success: false, message: "Error Occured" });
              } else {
                return res.json({
                  success: true,
                  message:
                    "An Account activation link has been sent on given email.",
                });
              }
            });
          })
          .catch((err) => res.json({ success: false, message: err.message }));
      });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
};

const login = (req, res) => {
  const { email, password } = req.body;

  // Check if Account Exists
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.json({ success: false, message: "Email Not Found!" });
      }
      //Checking Only: if user exsit then we will check the email is verified or not
      if (user.emailVerified == false)
        return res.json({
          success: false,
          message: "Please Verify Your Account by the link sent on mail",
        });

      // if user exsit then compare password
      bcrypt.compare(password, user.password, (err, result) => {
        if (result == true) {
          // if password is verified
          // We well sign a token
          const token = jwt.sign(
            { name: user.name, email: user.email, _id: user._id },
            "12345",
            { expiresIn: 300000 }
          );

          return res.json({
            success: true,
            message: "Logged IN",
            token: token,
            name: user.name,
          });
        } else {
          return res.json({ success: false, message: "Wrong Password" });
        }
      });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
};

const activateAccount = (req, res) => {
  const token = req.params.token;

  // try to verify token
  try {
    const data = jwt.verify(token, "12345");

    // try to find the User now
    User.findByIdAndUpdate(data._id, { emailVerified: true })
      .then(() => res.redirect("http://127.0.0.1:5173/"))
      .catch(() =>
        res.json({
          success: false,
          messaeg: "Please Try Again! We are sorry for Inconvinece!",
        })
      );
  } catch (err) {
    return res.json({ success: false, message: "Link has Been Expired!" });
  }
};

const sendForgetPasswordLink = (req, res) => {
  const { email } = req.body;

  // 1. Check if any account exist with this email
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res.json({
          success: false,
          message: "No Account find with this email!",
        });

      // generate token forget password tokne
      let token = jwt.sign({ _id: user._id }, "forgetPasswordToken1234", {
        expiresIn: 30 * 30,
      });

      // modify the token so that it will work on vite
      let newToken1 = token.replace(".", "--");
      let newToken2 = newToken1.replace(".", "--");

      // send this tokne on email
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "a.m2001nov@gmail.com",
          pass: "aptz zbky ebnx cxxg",
        },
      });

      var mailOptions = {
        from: "a.m2001nov@gmail.com",
        to: user.email,
        subject: "Forget Password",
        html: `
          <p> Hey ${user.name}, Click on the followign link to update your password </p>
        
          <a style="padding:10px; background-color: dodgerblue" href="http://127.0.0.1:5173/forget-password/set-password/${newToken2}"> Update Password </a>
  
          <p> If it's not done by you, Just ingone it </p>
          `,
      };

      // sending email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json({ success: false, message: "Error Occured" });
        } else {
          return res.json({
            success: true,
            message: "An Forget Password Link sent to your email",
          });
        }
      });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
};

const hanldePasswordUpdateDetials = (req, res) => {
  const { token, password } = req.body;

  // first change the token
  // modify the token so that it will work on vite
  let newToken1 = token.replace("--", ".");
  let newToken2 = newToken1.replace("--", ".");

  // verify the token
  try {
    const data = jwt.verify(newToken2, "forgetPasswordToken1234");
    // has the password
    bcrypt.hash(password, 10, (err, has) => {
      if (err) {
        return res.json({ success: false, message: err.message });
      }

      User.findByIdAndUpdate(data._id, { password: has })
        .then(() => res.json({ success: true, message: "password Updated" }))
        .catch((err) => res.json({ success: false, message: err.message }));
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

module.exports = {
  signup,
  login,
  activateAccount,
  sendForgetPasswordLink,
  hanldePasswordUpdateDetials,
};
