const fs = require("fs");
const path = require("path");

exports.seed = function(knex) {
  //Get path to avatars
  const avatarDir = path.join(__dirname, "../../public/avatars");
  const avatars = [];

  //Get every image in the avatar folder and add it to an array
  fs.readdirSync(avatarDir).forEach((avatar) => {
    avatars.push({ src: avatar });
  });

  //Insert avatars into db
  return knex("avatars").insert(avatars);
};
