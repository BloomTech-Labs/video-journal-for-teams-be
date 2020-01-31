const db = require('../database/dbConfig.js');

module.exports = {
  find,
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
}