
exports.up = function(knex) {
  return knex.schema
    .createTable('prompts', tbl => {
      tbl.increments();

      tbl.string('question', 128)
          .notNullable();
    
      tbl.string('description', 255)

      tbl.integer('team_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('teams')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

      tbl.timestamp('created_at')
            .defaultTo(knex.fn.now())
            .notNullable();
  })
  
    .createTable('videos', tbl => {
      tbl.increments();

      tbl.integer('owner_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
      tbl.string('title', 128)
            .notNullable();
        
      tbl.string('description', 255)

      tbl.timestamp('created_at')
            .defaultTo(knex.fn.now())
            .notNullable();

      tbl.timestamp('updated_at')
            .defaultTo(knex.fn.now())
            .notNullable();

      tbl.string('video_url', 128)
            .notNullable();
            
      tbl.integer('prompts_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('prompts')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
    })
    .table('users', tbl => {
      tbl.string('first_name', 128)
            .notNullable();
      tbl.string('last_name', 128)
            .notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
  .table('users', tbl => {
      tbl.dropColumn('last_name')
      tbl.dropColumn('first_name')
    })
    .dropTableIfExists('videos')
    .dropTableIfExists('prompts')
};
