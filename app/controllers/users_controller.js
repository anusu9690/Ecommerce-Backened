const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

router.post("/", function(req, res) {
  let body = req.body;
  let user = new User(body);
  //console.log(user);
  user
    .save()
    .then(function(user) {
      return user.generateToken();
    })
    .then(function(token) {
      res.header("x-auth", token).send();
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.post("/login", function(req, res) {
  let body = req.body;
  User.findByCredentials(body.email, body.password)
    .then(function(user) {
      return user.generateToken();
    })
    .then(function(token) {
      res.send(header("x-auth", token).send());
    })
    .catch(function(err) {
      res.status(401).send(err);
    });
});

module.exports = {
  usersController: router
};
