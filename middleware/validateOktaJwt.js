const OktaJWTVerifier = require("@okta/jwt-verifier");
require("dotenv").config();
const oktaJWTVerifier = new OktaJWTVerifier({
  issuer: `${process.env.OKTA_ISSUER}`,
  assertClaims: { aud: "api://default" },
});

const validateOktaJwt = (req, res, next) => {
  const token = req.headers.authorization;
  oktaJWTVerifier
    .verifyAccessToken(token, "api://default")
    .then((jwt) => {
      req.jwt = jwt.claims;
      next();
    })
    .catch((err) => {
      res.status(401).json({ message: "unauthorized user", error: err });
    });
};

module.exports = validateOktaJwt;
