const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/Book-model.js");
const List = require("../models/List-model.js");
const User = require("../models/User.js");
const SuggestedBook = require("../models/SuggestedBook-model.js");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// custom routes, will be split into route files later:

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
  const {
    isbn,
    title,
    cover,
    by_statement,
    publish_date,
    url,
  } = request.body.book;
  const listName = request.body.list;

  //console.log("Title in backend: ", title);
  //console.log("List in backend: ", listName);

  // Step 1 of 2: Check by book title if Book is already existing in database, if not -> create Book:
  Book.findOne({ title: title })
    .then((bookExists) => {
      if (bookExists != null) {
        console.log("Book exists already, checking for List now");
        return;
      } else {
        Book.create({
          isbn: isbn,
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
  List.findOne({ name: listName, owner: request.user._id })
    .then((listExists) => {
      if (listExists != null) {
        console.log("List found");

        Book.findOne({ title: title })
          .then((bookExists) => {
            console.log("returned value for book: ", bookExists);
            List.findOne({
              name: listName,
              owner: request.user._id,
              books: bookExists,
            })
              .then((listOfUserWithBookExists) => {
                if (listOfUserWithBookExists != null) {
                  console.log("Book exists already in this List");
                  return;
                } else {
                  List.updateOne(
                    { name: listName, owner: request.user._id },
                    { $push: { books: bookExists } }
                  )
                    .then((listUpdated) => {
                      console.log("List got updated: ", listUpdated);
                      // response needed to execute '.then()' in frontend:
                      response.send("done");
                      return;
                    })
                    .catch((error) => {
                      console.log("Error updating List: ", error);
                      next();
                    });
                }
              })
              .catch((error) => {
                console.log("Error finding book in user list: ", error);
                next();
              });
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
                List.updateOne(
                  { name: listName, owner: request.user._id },
                  { $push: { books: bookExists } }
                )
                  .then((listUpdated) => {
                    console.log("List got updated: ", listUpdated);
                    // response needed to execute '.then()' in frontend:
                    response.send("done");
                    return;
                  })
                  .catch((error) => {
                    console.log("Error updating List: ", error);
                    next();
                  });
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

router.get("/dashboard/getUserList", (request, response, next) => {
  List.find({ owner: request.user._id })
    .populate("books")
    .then((allListsOfUser) => {
      response.send(allListsOfUser);
    })
    .catch((error) => {
      console.log("Error getting all lists of user: ", error);
      next();
    });
});

router.post("/addList", (request, response, next) => {
  //console.log(request.body.name);
  List.create({
    name: request.body.name,
    owner: request.user._id,
  })
    .then((newList) => {
      console.log("backend: new list created: ", newList);
      response.send("done");
    })
    .catch((error) => {
      console.log("Error at creating new list ", error);
      next();
    });
});

router.post("/deleteBookFromList", (request, response, next) => {
  const { book, list } = request.body;
  //console.log("in backend: ", book, list);

  Book.findOne({ title: book })
    .then((bookObject) => {
      //console.log("found book: ", bookObject);
      //console.log("id of found book: ", bookObject._id);
      List.updateOne(
        { owner: request.user._id, name: list },
        { $pull: { books: bookObject._id } }
      )
        .then((list) => {
          //console.log("Book removed from List: ", list);
          response.send("done");
        })
        .catch((error) => {
          console.log("Error removing book from list: ", error);
          next();
        });
    })
    .catch((error) => {
      console.log("Error finding book: ", error);
      next();
    });
});

router.post("/getBook", (request, response, next) => {
  //console.log("in backend now");
  //console.log(request.body.title);

  Book.find({ title: request.body.title })
    .then((book) => {
      response.send(book);
    })
    .catch((error) => {
      console.log("Error finding book: ", error);
      next();
    });
});

router.post("/shareBook", (request, response, next) => {
  console.log(request.body.title);
  console.log(request.body.friend);

  Book.findOne({ title: request.body.title })
    .then((book) => {
      console.log("find book: ", book);
      SuggestedBook.create({
        isbn: book.isbn,
        title: book.title,
        by: book.by,
        year: book.year,
        cover: book.cover,
        url: book.url,
        suggestedBy: request.user.username,
        comment: request.body.comment,
      })
        .then((suggestedBook) => {
          console.log("creating suggested book: ", suggestedBook);
          User.updateOne(
            { username: request.body.friend },
            { $push: { suggestedBooks: suggestedBook } }
          )
            .populate("suggestedBooks")
            .then((updated) => {
              console.log("Book successfully shared: ", updated);
              response.send(updated);
            })
            .catch((error) => {
              console.log("Error at updating user: ", error);
              next();
            });
        })
        .catch((error) => {
          console.log("Error at creating suggestedBook: ", suggestedBook);
          next();
        });
    })
    .catch((error) => {
      console.log("Error at finding book: ", error);
      next();
    });
});

router.get("/getSuggestedBooksList", (request, response, next) => {
  console.log("backend: /getSuggestedBooksList");
  User.findOne({ _id: request.user._id })
    .populate("suggestedBooks")
    .then((user) => {
      // console.log(user.suggestedBooks);
      response.send(user.suggestedBooks);
    })
    .catch((error) => {
      console.log("error getting books from database in backend: ", error);
      next();
    });
});

router.post("/follow/:id", (req, res) => {
  console.log("/follow: ", req.params.id);
  User.findOne({ _id: req.params.id }).then((user) => {
    User.findOne({ _id: req.user._id }).then((loggedInUser) => {
      console.log("logged", loggedInUser);
      loggedInUser.following.push(user._id);
      loggedInUser.save().then((result) => {
        console.log(result);
        res.send(result);
      });
    });
    console.log(user);
  });
});

module.exports = router;
