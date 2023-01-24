const fs = require("fs");

// Checks if directory exists and if not creates a new directory
// This will prevent errors
const newDirectory = "./new";
if (!fs.existsSync(newDirectory)) {
  fs.mkdir(newDirectory, (err) => {
    if (err) throw err;
    console.log(`Directory created`);
  });
}

if (fs.existsSync(newDirectory)) {
  fs.rmdir(newDirectory, (err) => {
    if (err) throw err;
    console.log(`Directory removed`);
  });
}
