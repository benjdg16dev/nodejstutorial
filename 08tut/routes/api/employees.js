// Note: Does not need any static file as this will be just delivering
// JSON data and not a webpage

const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};

const fs = require("fs");
const filePath = path.join(__dirname, "..", "..", "data", "employees.json");

// Note: Just like connecting the path to Database
data.employees = require(filePath);

const fsData = fs.readFileSync(filePath, {
  encoding: "utf8",
});

router
  .route("/")
  .get((req, res) => {
    // res.json(data.employees);

    // Note: Assignment attempt
    if (!!fsData) {
      res.json(JSON.parse(fsData));
    }
  })
  .post((req, res) => {
    // Note: Not yet a full api
    // Just showing that we can use parameters in this post request
    // his will NOT put into the data file

    // fs.res.json({
    //   firstname: req.body.firstname,
    //   lastname: req.body.lastname,
    // });

    // Note: Assignment attempt

    if (!!req.body.firstname && !!req.body.lastname) {
      // Note: Allows duplicates; will append as new ID
      const currentData = JSON.parse(
        fs.readFileSync(filePath, { encoding: "utf8" })
      );

      const id = Array.isArray && currentData?.length;

      currentData.push({
        id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });

      fs.writeFileSync(filePath, JSON.stringify(currentData));
      const newData = fs.readFileSync(filePath, { encoding: "utf8" });

      res.json(JSON.parse(newData));
    } else {
      res.status(400).send({
        message: "Error 400: Bad Request",
      });
    }
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
