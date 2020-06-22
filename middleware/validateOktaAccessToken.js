const axios = require("axios");
const qs = require("querystring");
require("dotenv").config();

const validateOktaAccessToken = (req, res, next) => {
  const token = req.headers.authorization;
  const introspectUrl = `https://dev-292346.okta.com/oauth2/default/v1/introspect?client_id=${process.env.CLIENT_ID}&token=${token}&token_type_hint=access_token`;
  axios
    .post(
      introspectUrl
      // qs.stringify({
      //   client_id: `${process.env.CLIENT_ID}`,
      //   token: `${token}`,
      //   token_type_hint: "access_token",
      // })
    )
    .then((response) => {
      response.data.active
        ? next()
        : res.status(401).json({ message: "unauthorized user" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

module.exports = validateOktaAccessToken;
