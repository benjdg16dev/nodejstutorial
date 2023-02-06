const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// Route has regex
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page.(html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page.(html)?", (req, res) => {
  // Note: Specified redirect 301 since 302 is default
  // This is also for search engines
  res.redirect(301, "/new-page.html"); // 302 by default
});

// Route handlers
// Chaining
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attemped to load hello.html");
    // Note: Will move to the next handler/expression
    next();
  },
  (req, res) => {
    // Note: This is the next handler in the chain
    res.send("Hello World!");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};
// Note: Handlers are inside array
app.get("/chain(.html)?", [one, two, three]);

// Note: These "next" are almost similar to middleware

app.get("/*", (req, res) => {
  // Note: Status will be 200 since it will find the "404.html file"
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
