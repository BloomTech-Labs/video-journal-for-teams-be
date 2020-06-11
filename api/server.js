const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const socketio = require("socket.io");
var http = require("http");

const passport = require("passport");
require("../passport/index");

const AuthRouter = require("../auth/authRouter.js");
const UserRouter = require("../users/userRouter.js");
const TeamRouter = require("../teams/teamRouter.js");
const VideoRouter = require("../videos/videoRouter.js");
const InviteRouter = require("../invites/inviteRouter.js");
const AvatarRouter = require("../avatars/avatarRouter");
const EmailRouter = require("../email/emailRouter");
const OrganizationRouter = require("../organization/organizationRouter");
const userRouterV2 = require("../users/userV2Router");
const OrganizationRouterV2 = require("../organization/organizationRouterV2");
const TeamsRouterV2 = require("../teams/teamRouterV2");
const VideoRouterV2 = require("../videos/videoRouterV2");
const validateOktaAccessToken = require("../middleware/validateOktaAccessToken");

const server = express();

const app = http.createServer(server);
const io = socketio(app);
io.origins("*:*");
//passing socket to routers
server.set("io", io);

io.on("connect", (socket) => {
  socket.emit("connected", "Established connection with the client");
});

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(passport.initialize());

server.use("/api/auth", AuthRouter);

server.use("/api/v2/users", validateOktaAccessToken, userRouterV2);
server.use(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  UserRouter
);
server.use(
  "/api/teams",
  passport.authenticate("jwt", { session: false }),
  TeamRouter
);
server.use("/api/v2/teams", TeamsRouterV2);

server.use(
  "/api/videos",
  passport.authenticate("jwt", { session: false }),
  VideoRouter
);

server.use("/api/v2/videos", validateOktaAccessToken, VideoRouterV2);
server.use("/api/invites", InviteRouter);
server.use("/api/avatars", AvatarRouter);
server.use("/api/email", EmailRouter);
server.use(
  "/api/organizations",
  passport.authenticate("jwt", { session: false }),
  OrganizationRouter
);
server.use(
  "/api/v2/organizations",
  validateOktaAccessToken,
  OrganizationRouterV2
);

server.use("/public", express.static(path.join(__dirname, "../public")));

server.use(function (err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

module.exports = app;
