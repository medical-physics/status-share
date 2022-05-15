const express = require("express");
const auth = require('./../util/auth');

// router is an instance of the express router
// We use it to define our routes
// The router will be added as a middleware
const router = express.Router();

const {
	getUser,
	postOneUser,
	updateUserDetails,
	updateUserStatus,
	updateUserMemo,
	updateUserPresence,
	deleteUser
} = require("../handlers/users");

const {
	getTeams,
	postOneTeam,
	deleteTeam,
	updateTeam
} = require("../handlers/teams");

const {
	getAppName,
	setAppName,
	login,
	refreshLogin,
	register
} = require("../handlers/app");

const {
	postOneMessage,
	deleteMessage,
	updateMessageReadStatus,
	updateMessage
} = require("../handlers/mailbox");

// User routes
// router.get("/user/:userId", getUser);
// router.post("/user", auth, postOneUser);
// router.post("/user/:userId", auth, updateUserDetails);
// router.post("/user/memo/:userId", auth, updateUserMemo);
// router.post("/user/status/:userId", auth, updateUserStatus);
// router.post("/user/presence/:userId", auth, updateUserPresence);
// router.delete("/user/:userId", auth, deleteUser);

// Team routes
router.get("/teams", getTeams);
router.post("/team", auth, postOneTeam);
router.delete("/team/:teamId", auth, deleteTeam);
router.post("/team/:teamId", auth, updateTeam);

// App routes
router.get("/appname", getAppName);
router.post("/appname", auth, setAppName);
router.post("/login", login);
router.post("/refreshlogin", auth, refreshLogin);
router.post("/register", auth, register);

// Mailbox routes
// router.post("/mailbox/:userId", auth, postOneMessage);
// router.delete("/mailbox/:userId/:messageId", auth, deleteMessage);
// router.post("/mailbox/read/:userId/:messageId", auth, updateMessageReadStatus);
// router.post("/mailbox/update/:userId/:messageId", auth, updateMessage);

module.exports = router;
