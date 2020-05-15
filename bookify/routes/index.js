const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/Book-model.js");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// custom routes, will be split into route files later:
router.post("/dashboard/savebook", (request, response) => {
  console.log("success on backend");
  console.log(request.body);
  const { title, cover, by_statement, publish_date, url } = request.body;

  Book.findOne({ title: title })
    .then((bookExists) => {
      if (bookExists) {
        console.log("This book already exists");
        return;
      } else {
        Book.create({
          title: title,
          by: by_statement,
          year: publish_date,
          cover: cover,
          url: url,
        })
          .then((bookCreated) => {
            console.log("successfully created book: ", bookCreated);
          })
          .catch((error) => {
            console.log(error);
            next();
          });
      }
    })
    .catch((error) => {
      console.log("Error finding book: ", error);
      next();
    });
});

router.get("/dashboard/getbooks", (request, response) => {
  Book.find()
    .then((allBooksFromDb) => {
      response.send(allBooksFromDb);
    })
    .catch((error) => {
      console.log("error getting books from database in backend: ", error);
      next();
    });
});

<<<<<<< HEAD
router.delete("/dashboard/deletebooks/:title", (request, response, next) => {
  // console.log("parameter", request.params);
  Book.findOneAndDelete(request.params.title);
});

=======
>>>>>>> ee047c9e62212d8ca3d01a15cff2385026fd5b60
module.exports = router;
