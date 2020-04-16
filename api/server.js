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
const EmailRouter = require("../email/emailRouter")
const OrganizationRouter = require("../organization/organizationRouter");

const server = express();

const app = http.createServer(server);
const io = socketio(app);
//passing socket to routers
server.set('io',io);


io.on('connect', (socket) => {
	console.log('socket connection established');

	socket.emit('connected', 'Established connection with the client')

	// socket.on('disconnect', () => {
	// 	console.log('socket disconnected')
	// })
})

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(passport.initialize());


server.use("/api/auth", AuthRouter);
server.use("/api/users", passport.authenticate("jwt", { session: false }), UserRouter);
server.use("/api/teams", passport.authenticate("jwt", { session: false }), TeamRouter);
server.use("/api/videos", passport.authenticate("jwt", { session: false }), VideoRouter);
server.use("/api/invites", InviteRouter);
server.use("/api/avatars", AvatarRouter);
server.use("/api/email", EmailRouter)
server.use("/api/organizations", passport.authenticate("jwt", { session: false }), OrganizationRouter);

server.use("/public", express.static(path.join(__dirname, "../public")));

server.use(function (err, req, res, next) {
	console.log('This is the invalid field ->', err.field)
	next(err)
})

server.get("/", (req, res) => {
	res.status(200).json({ api: "running" });
});



module.exports = app;
