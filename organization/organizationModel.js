const db = require("../database/dbConfig.js");

module.exports = {
  insert,
  insertOrgUser,
  getOrgRole,
  getOrganzationsByUser,
  getTeamsByOrganization,
  getUsersByOrganization,
  deleteOrganizationMember,
  findById,
  switchOrgRole,
};

//create an org
function insert(organization) {
  return db("organizations").insert(organization, "id");
}

//Insert user to an orgs_users table
function insertOrgUser(data) {
  return db("organizations_users").insert(data);
}

function getOrgRole(user_id, org_id) {
  return db("organizations_users")
    .select("*")
    .where({ user_id: user_id, organization_id: org_id })
    .first();
}

function getOrganzationsByUser(user_id) {
  return db("organizations")
    .join(
      "organizations_users",
      "organizations.id",
      "organizations_users.organization_id"
    )
    .where({ user_id: user_id })
    .select("organizations.*", "organizations_users.role_id");
}

function getTeamsByOrganization(org_id) {
  return db("teams").select("*").where({ organization_id: org_id });
}

function getUsersByOrganization(org_id) {
  return db("users")
    .join("organizations_users", "users.id", "organizations_users.user_id")
    .where("organizations_users.organization_id", org_id)
    .select(
      "users.id as user_id",
      "users.avatar as avatar",
      "users.email",
      "organizations_users.role_id"
    )
    .columns(
      db.raw("users.first_name || ' ' || users.last_name as user_full_name")
    );
}

function deleteOrganizationMember(org_id, member_id) {
  return db("organizations_users")
    .where({ organization_id: org_id, user_id: member_id })
    .del();
}

function switchOrgRole(organization_id, user_id, role_id) {
  return db("organizations_users")
    .update({ role_id })
    .where({ organization_id, user_id })
    .then((count) => {
      return getOrgRole(user_id, organization_id);
    });
}

function findById(id) {
  return db("organizations").where({ id }).first();
}
