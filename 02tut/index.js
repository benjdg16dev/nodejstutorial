const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

/** READFILE */

fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    /**
  // Below code will show buffer data we can use .toString() or
  // input 2nd parameter 'utf8'
  console.log(data);
  */

    console.log(data);
  }
);

/** ASYNCHRONOUS DEMO */

// This will be called first since Node is asynchronous
console.log(`Hello...`);

/** WRITEFILE */

// "utf8" is not needed since it is default
const writeContent = "Nice to meet you";

fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  writeContent,
  (err) => {
    if (err) throw err;
    console.log(`Write complete`);
  }
);

/** APPENDFILE */

const appendContent = "Testing text";

fs.appendFile(
  path.join(__dirname, "files", "test.txt"),
  appendContent,
  (err) => {
    if (err) throw err;
    console.log(`Append complete`);
  }
);

/** WRITEFILE, APPENDFILE & RENAME */

const writeAppend1 = "Nice to meet you.";
const writeAppend2 = "\n\nYes it is.";

// Callback hell

// fs.writeFile(
//   path.join(__dirname, "files", "writeAppend.txt"),
//   writeAppend1,
//   (err) => {
//     if (err) throw err;
//     console.log(`Write complete`);

//     // Use append file inside so that `writeFile` creates the file
//     fs.appendFile(
//       path.join(__dirname, "files", "writeAppend.txt"),
//       writeAppend2,
//       (err) => {
//         if (err) throw err;
//         console.log(`Append complete`);

//         fs.rename(
//           path.join(__dirname, "files", "writeAppend.txt"),
//           path.join(__dirname, "files", "newWriteAppend.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log(`Rename complete`);
//           }
//         );
//       }
//     );
//   }
// );

// Async await

const fileOps = async () => {
  const promiseAppend = "\n\nNice to meet you.";
  const promiseCompleteFilename = "promiseComplete.txt";
  try {
    // No need for callback with err and data since we have try catch
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(`Async await data: ${data.toString()}`);

    // Unlink is actually a delete
    // Will produce an error on 2nd run since starter.txt is deleted
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"), data);

    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      promiseAppend
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", promiseCompleteFilename)
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", promiseCompleteFilename),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();

/** CATCHING ERRORS */

// exit on uncaught errors
// "process" is already available; no need to import
process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
});
