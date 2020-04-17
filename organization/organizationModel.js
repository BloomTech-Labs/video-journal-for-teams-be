const db = require("../database/dbConfig.js");

module.exports = {
    insert,
    insertOrgUser,
    getOrgRole
}

//create an org
function insert(organization) {
    return db("organizations").insert(organization, "id");
}

//Insert user to an orgs_users table
function insertOrgUser(data) {
    return db("organizations_users").insert(data);
}

function getOrgRole(user_id, org_id){
    return db("organizations_users")
    .select("*")
    .where({user_id: user_id, organization_id: org_id})
    .first()
}
