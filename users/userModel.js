const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findByEmail,
  findByUsername,
  insert,
  update,
  remove
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

function insert(user) {
  return db("users").insert(user, "id");
}

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('users')
        .where({ id })
        .del();
}