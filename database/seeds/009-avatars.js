const fs = require("fs");
const path = require("path");

exports.seed = function(knex) {
  const avatarDir = path.join(__dirname, "../../public/avatars");
  const avatars = [];

  fs.readdirSync(avatarDir).forEach((avatar) => {
    avatars.push({ src: avatar });
  });

  return knex("avatars").insert(avatars);
};
