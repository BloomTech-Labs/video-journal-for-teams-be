<<<<<<< HEAD
require('dotenv').config();

module.exports = {
=======
require("dotenv").config();
>>>>>>> 69c415b7ebf98cb90e4eab4bf518622d3fa01c22

module.exports = {
  development: {
<<<<<<< HEAD
    client: 'pg',
=======
    client: "pg",
>>>>>>> 69c415b7ebf98cb90e4eab4bf518622d3fa01c22
    connection: process.env.DATABASE_URL_DEV,
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  testing: {
    client: "pg",
    connection: process.env.DATABASE_URL_TEST,
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
