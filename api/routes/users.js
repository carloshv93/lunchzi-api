const express = require("express");
const usersRouter = express.Router();
const { isAuthenticated } = require("../auth");

usersRouter.get("/me", isAuthenticated, (req, res) => {
  res.send(req.user);
});

module.exports = usersRouter;
