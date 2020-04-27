
exports.seed = function(knex) {
  // Deletes ALL existing entries
  const orgUsers = [];
  for(let i=1;i<=100;i++){
    if(i < 3){
      orgUsers.push({organization_id:1, user_id:i, role_id:3})
    } else {
      orgUsers.push({organization_id:1, user_id:i, role_id:4})
    }
    
  } 

  return knex('organizations_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('organizations_users').insert(orgUsers);
    });
};
