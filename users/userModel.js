const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findByEmail,
  findByUsername,
};

function find() {
  return db("users").select("*");
}

function findById(id) {
  return db
    .select("*")
    .from("users")
    .where({ id: id })
    .first();
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
