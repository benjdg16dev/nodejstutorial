// Note: Does not need any static file as this will be just delivering
// JSON data and not a webpage

const express = require("express");
const router = express.Router();
const path = require("path");
const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// Note: GET method is left out because they can access it
router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

// Parameter directly in the URL
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
