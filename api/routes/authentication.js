const express = require("express");
const usersRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const signToken = (_id) => {
  return jwt.sign({ _id }, "secret-key", { expiresIn: "1d" });
};

usersRouter.post("/signup", (req, res) => {
  const { email, password } = req.body;
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString("base64");
    crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", (err, key) => {
      const encryptedPassword = key.toString("base64");
      Users.findOne({ email })
        .exec()
        .then((user) => {
          if (user) {
            return res.send("User already exists");
          }
          Users.create({
            email,
            password: encryptedPassword,
            salt: newSalt,
          }).then(() => {
            res.send("User created");
          });
        });
    });
  });
});

usersRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: "Invalid email or password" });
      } else {
        crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", (err, key) => {
          const encryptedPassword = key.toString("base64");
          if (user.password === encryptedPassword) {
            const token = signToken(user._id);
            res.send({
              token,
            });
          } else {
            res.status(401).send({ message: "Invalid email or password" });
          }
        });
      }
    });
});

module.exports = usersRouter;
