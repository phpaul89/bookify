const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/Book-model.js");
const List = require("../models/List-model.js");

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

router.delete("/dashboard/deletebooks/:title", (request, response) => {
  // console.log("parameter", request.params);
  Book.findOneAndDelete(request.params.title);
});

router.post("/dashboard/saveToList", (request, response, next) => {
  // destructuring: if variables is not passed by API -> initialized with 'undefined'
  const { title, cover, by_statement, publish_date, url } = request.body.book;
  const listName = request.body.list;

  // Step 1 of 2: Check by book title if Book is already existing in database, if not -> create Book:
  Book.findOne({ title: title })
    .then((bookExists) => {
      if (bookExists) {
        console.log("Book exists already, checking for List now");
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

  // Step 2 of 2: Check by list name if List is already existing in database, if not -> create List and push Book to books property:
  List.findOne({ name: listName })
    .then((exists) => {
      if (exists != null) {
        Book.findOne({ title: title })
          .then((bookExists) => {
            if (bookExists) {
              console.log("Book exists already in this List");
              return;
            } else {
              List.update({ name: listName }, { $push: { books: bookExists } })
                .then((listUpdated) => {
                  console.log("List got updated: ", listUpdated);
                  return;
                })
                .catch((error) => {
                  console.log("Error updating List: ", error);
                  next();
                });
            }
          })
          .catch((error) => {
            console.log("Error finding Book: ", error);
            next();
          });
      } else {
        List.create({
          name: listName,
          owner: request.user._id,
          books: [],
        })
          .then((newList) => {
            console.log("New list created: ", newList);
            Book.findOne({ title: title })
              .then((bookExists) => {
                if (bookExists) {
                  console.log("Book exists already in this List");
                  return;
                } else {
                  List.update(
                    { name: listName },
                    { $push: { books: bookExists } }
                  )
                    .then((listUpdated) => {
                      console.log("List got updated: ", listUpdated);
                      return;
                    })
                    .catch((error) => {
                      console.log("Error updating List: ", error);
                      next();
                    });
                }
              })
              .catch((error) => {
                console.log("Error finding Book: ", error);
                next();
              });
          })
          .catch((error) => {
            console.log("Error creating List: ", error);
            next();
          });
      }
    })
    .catch((error) => {
      console.log("Error finding List: ", error);
      next();
    });
});

module.exports = router;
