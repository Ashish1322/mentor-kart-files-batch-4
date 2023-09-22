const jwt = require("jsonwebtoken");

// This middleware will be used for validating the data whil signup
function checkBodyParams(req, res, next) {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res.json({ success: false, message: "Invalid Data" });

  if (password.length < 6)
    return res.json({ success: false, message: "Weak Password" });

  if (name.length <= 1)
    return res.json({ success: false, message: "Invalid Name" });

  if (email.length < 6)
    return res.json({ success: false, message: "Wrong Email" });

  next();
}

// This middleware you can use in any route where you need only loggedin peopel
function isLoggedIn(req, res, next) {
  const token = req.headers.authorization;

  try {
    const data = jwt.verify(token, "12345");
    console.log(data);
    // Injecting the dat inside the request so that the next controllor can access this injected data this is the
    // method for passing the data from  middleware to controllor
    req.tokenData = data;
    return next();
    // after you can write your logic
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
}

module.exports = { checkBodyParams, isLoggedIn };
