// Example if files are too large. Stream is better.

const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), {
  encoding: "utf8",
});
const ws = fs.createWriteStream(path.join(__dirname, "files", "new-lorem.txt"));

// Note: 1 way is to listen
// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });
// Note: Piping is more efficient
rs.pipe(ws);
