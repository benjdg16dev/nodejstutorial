const { format } = require("date-fns");
// Importing like v4 as uuid in ES6
// We can also use uuid.v4
const { v4: uuid } = require("uuid");

console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

console.log(uuid());
