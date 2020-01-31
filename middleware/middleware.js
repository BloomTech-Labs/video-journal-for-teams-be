const signToken = require("./signToken");
const validateSignup = require("./validateSignup");
const validateUserId = require("./validateUserId");
const validateTeamId = require("./validateTeamId");
const validateVideoId = require("./validateVideoId");

module.exports = {
  signToken,
  validateUserId,
  validateSignup,
  validateTeamId,
  validateVideoId
};