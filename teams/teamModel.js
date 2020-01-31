const db = require("../database/dbConfig.js");

module.exports = {
  find,
<<<<<<< HEAD
  findBy,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db('teams')
    .select('*');
}

function findBy(filter) {
    return db('teams')
        .select('id', 'name', 'description')
        .where(filter);
}

function findById(id) {
    return db('teams')
        .select('id', 'name', 'description')
        .where({ id })
        .first();
}

function insert(team) {
    return db('teams')
        .insert(team, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function update(id, changes) {
    return db('teams')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('teams')
        .where({ id })
        .del();
=======
  findById,
  findByUserId
};

function find() {
  return db("teams")
    .select("*");
}

function findById(id) {
  return db
    .select("*")
    .from("teams")
    .where({ id: id })
    .first();
}

function findByUserId(user_id) {
  return db("teams")
    .join("team_members", "teams.id", "team_members.team_id")
    .where("team_members.user_id", user_id)
    .select("teams.id as id", "teams.name as name", "teams.description as description", "teams.created_at as created_at", "teams.updated_at as updated_at", "team_members.role_id as role_id")
>>>>>>> eafa8e8d439e27c63334a65952192468e8c09cd0
}