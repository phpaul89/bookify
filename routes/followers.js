const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const List = require("../models/List-model");
const Book = require("../models/Book-model");

router.post("/follow/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    User.findOne({ _id: req.user._id }).then((loggedInUser) => {
      loggedInUser.following.includes(user._id, 0)
        ? res.send("You already follow this user")
        : loggedInUser.following.push(user._id);
      loggedInUser.save().then((result) => {
        res.send(result);
      });
    });
  });
});

// list of users that will appear as suggestions to follow - See Users component
router.get("/users", (req, res) => {
  User.find({}).then((users) => {
    users = users.filter((el) => {
      return !el._id.equals(req.user._id);
    });
    res.send({ users, loggedIn: req.user });
  });
});

router.get("/followers/getbooks", (req, res) => {
  User.findById(req.user._id).then((loggedInUser) => {
    const idFollower = loggedInUser.following.map(
      (followerId) =>
        new Promise((resolve, reject) =>
          resolve(List.find({ owner: followerId }))
        )
    );
    Promise.all(idFollower).then((allListModels) => {
      const books = [];
      allListModels.map((userListModels) => {
        return userListModels.map((oneListModel) => {
          return oneListModel.books.map((bookId) => {
            return books.push(bookId);
          });
        });
      });
      const bookPromise = books.map((bookId) => {
        return new Promise((resolve, reject) => {
          return resolve(Book.findById(bookId));
        });
      });
      Promise.all(bookPromise).then((listOfBooks) => {
        res.send({ booksFromFollowers: listOfBooks });
      });
    });
  });
});

router.post("/getFollowers", (request, response, next) => {
  User.findById(request.user._id)
    .populate("following")
    .then((loggedInUser) => {
      const allFollowersFromDb = loggedInUser.following.map((follower) => {
        return { username: follower.username, avatar: follower.avatar };
      });

      response.send(allFollowersFromDb);
    });
});

router.post("/removeFollower", (request, response, next) => {
  const follower = request.body.name;

  User.findOne({ username: follower })
    .then((follower) => {
      User.updateOne(
        { _id: request.user._id },
        { $pull: { following: follower._id } }
      )
        .then((success) => {
          User.findById(request.user._id).then((updatedUser) => {
            response.send(updatedUser);
          });
        })
        .catch((error) => {
          console.log("Error at updating follower array: ", error);
          next();
        });
    })
    .catch((error) => {
      console.log("Error at finding follower: ", error);
      next();
    });
});

module.exports = router;
