// Note: Does not need any static file as this will be just delivering
// JSON data and not a webpage

const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};

// Note: Just like connecting the path to Database
data.employees = require(path.join("..", "..", "data", "employees.json"));

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    // Note: Not yet a full api
    // Just showing that we can use parameters in this post request
    // This will NOT put into the data file
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

// Parameter directly in the URL
router.route("/:id").get((req, res) => {
  res.json({
    id: req.params.id,
  });
});

module.exports = router;
