const jwt = require("jsonwebtoken");

function isLoggedIn(req, res, next) {
  const token = req.headers.authorization;

  try {
    const data = jwt.verify(token, "ABC1234");

    // Injecting the dat inside the request so that the next controllor can access this injected data this is the
    // method for passing the data from  middleware to controllor
    req.user = data;
    return next();
    // after you can write your logic
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
}

module.exports = { isLoggedIn };
