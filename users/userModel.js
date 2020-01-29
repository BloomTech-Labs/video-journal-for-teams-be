const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findByEmail,
  findByUsername,
};

function find() {
  return db("users").select("*");
}

function findByEmail(email) {
  return db
    .select("*")
    .from("users")
    .where({ email: email })
    .first();
}

function findByUsername(username) {
  return db
    .select("*")
    .from("users")
    .where({ username: username })
    .first();
}
