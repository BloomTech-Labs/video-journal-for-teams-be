const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const passport = require("passport");
require("../passport/index");

const AuthRouter = require("../auth/authRouter.js");
const UserRouter = require("../users/userRouter.js");
const TeamRouter = require("../teams/teamRouter.js");
const VideoRouter = require("../videos/videoRouter.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(passport.initialize());

server.use("/api/auth", AuthRouter);
server.use("/api/users", passport.authenticate("jwt", {session: false}), UserRouter);
server.use("/api/teams", passport.authenticate("jwt", {session: false}), TeamRouter);
server.use("/api/videos", passport.authenticate("jwt", {session: false}), VideoRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

module.exports = server;
