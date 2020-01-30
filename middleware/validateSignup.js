module.exports = function(req, res, next) {
  const { email, username, password } = req.body;

  if (email && username && password) {
    //Add user info to req object for route to access
    req.user = {
      email: email,
      username: username,
      password: password,
    };
    next();
  } else {
    res.status(400).json({ message: "Please provide a valid email, username and password to signup." });
  }
};
