const axios = require("axios");
require("dotenv").config();

const validateOktaAccessToken = (req, res, next) => {
  authHeader = req.headers.authorization;
  axios
    .post(
      `https://dev-292346.okta.com/oauth2/default/v1/introspect?client_id=${process.env.CLIENT_ID}&token=${authHeader}&token_type_hint=access_token`
    )
    .then((response) =>
      response.data.active
        ? next()
        : res.status(401).json({ message: "unauthorized user" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

module.exports = validateOktaAccessToken;
