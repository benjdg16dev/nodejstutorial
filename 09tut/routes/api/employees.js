// Note: Does not need any static file as this will be just delivering
// JSON data and not a webpage

const express = require("express");
const router = express.Router();
const path = require("path");
const employeesController = require("../../controllers/employeesController");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

// Parameter directly in the URL
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
