const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Your username cannot be empty" });
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Your password must contain at least 6 characters" });
  }

  User.findOne({ username: username })
    .then((found) => {
      if (found) {
        return res
          .status(400)
          .json({ message: "This username is already taken" });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({ username: username, password: hash }).then(
        (dbUser) => {
          req.login(dbUser, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error while attempting to login" });
            }
            res.json(dbUser);
          });
        }
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    // if (!password) {
    //   return res.status(401).json({ message: "Wrong password" });
    // }
    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while attempting to login" });
      }
      return res.json(user);
    });
  })(req, res);
});

router.delete("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successful logout" });
});

router.get("/loggedin", (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = router;