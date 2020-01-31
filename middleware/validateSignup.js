module.exports = function(req, res, next) {
  const { email, username, password, first_name, last_name } = req.body;

  if (email && username && password && first_name && last_name) {
    //Add user info to req object for route to access
    req.user = {
      email: email,
      username: username,
      password: password,
      first_name: first_name, 
      last_name: last_name
    };
    next();
  } else {
    res.status(400).json({ message: "Please provide a valid first name, last name, email, username and password to signup." });
  }
};
