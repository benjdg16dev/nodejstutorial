const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

// Note: Name of the file 'Employee'
// By default, Mongoose when it creates this model
// will set "Employee" to "employees"
module.exports = mongoose.model("Employee", employeeSchema);
