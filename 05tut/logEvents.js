// NPM modules
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
// Common core modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  // Note: Append file creates the file but not the directory
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
