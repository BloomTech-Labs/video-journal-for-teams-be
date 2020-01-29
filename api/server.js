const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const passport = require("passport");
require("../passport/index");

const UserRouter = require("../users/userRouter.js");
const TeamRouter = require("../teams/teamRouter.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(passport.initialize());

server.use("/api/users", UserRouter);
server.use("/api/teams", TeamRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

module.exports = server;
