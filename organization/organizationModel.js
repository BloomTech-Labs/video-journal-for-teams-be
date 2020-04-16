const db = require("../database/dbConfig.js");

module.exports = {
    insert,
    insertOrgUser,
}

//create an org
function insert(organization) {
    return db("organizations").insert(organization, "id");
}

//Insert user to an orgs_users table
function insertOrgUser(data) {
    return db("organizations_users").insert(data);
}

