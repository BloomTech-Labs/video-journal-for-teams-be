module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost',
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds'
    },
  },
  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};