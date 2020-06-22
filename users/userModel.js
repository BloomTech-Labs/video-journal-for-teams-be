const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findByEmail,
  findByUsername,
  insert,
  update,
  findByIdEmail,
  getSingleVideoFeedback,
};

function find() {
  return db("users").select("*");
}

function findById(id) {
  return db
    .select("id", "email", "username", "first_name", "last_name", "avatar")
    .from("users")
    .where({ id: id })
    .first();
}

function findByIdEmail(id) {
  return db.select("*").from("users").where({ id: id }).first();
}

// function findByEmail(email) {
// 	return db
// 		.select("*")
// 		.from("users")
// 		.where({ email: email })
// 		.first();
// }

function findByEmail(email) {
  return (
    db("users")
      .select("*")
      // .join("organizations_users", "users.id", "organizations_users.user_id")
      .where({ email: email })
      .first()
  );
}

function findByUsername(username) {
  return db.select("*").from("users").where({ username: username }).first();
}

// function findByUsername(username) {
// 	return db("users")
// 		.join("organizations_users", "users.id", "organizations_users.user_id")
// 		.where({ username: username })
// 		.first()
// 		.select("*");

// }

// insert new user when registering...   How do i get organization ID from invite link?
// function insert(user, org_id) {
// 	return db("users").insert(user, 'id')
// 	.then(response => {
// 		return db('organizations_users')
// 		.insert({organization_id: org_id, user_id: response[0], role_id: 4}, 'user_id')
// 	})
// }

function insert(user) {
  return db("users").insert(user, "id");
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then((count) => {
      return findById(id);
    });
}

function getSingleVideoFeedback(videoId) {
  return db("videos_feedback").where("video_id", videoId);
}
