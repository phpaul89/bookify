const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/Book-model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// custom routes, will be split into route files later:
router.post("/dashboard/savebook", (request, response) => {
  console.log("success on backend");
  console.log(request.body);
  const { title, cover, by_statement, publish_date, url } = request.body;

  Book.create({
    title: title,
    by: by_statement,
    year: publish_date,
    cover: cover,
    url: url,
  })
    .then((response) => {
      console.log("successfully created book: ", response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
