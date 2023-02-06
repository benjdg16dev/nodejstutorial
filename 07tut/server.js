const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Note: Cross Origin Resource Sharing
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  // Note: !origin for development because it is undefined
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // pass
      // callback(error, and if origin is sent back)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
// Note: Works as a waterfall; If put above our routes this will apply to
// all routes that come in.
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "/public")));

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

// Note: app.use() does not accept regex and is most likely used for middleware
// app.all() meanwhile is used for routing; it will apply to ALL HTTP METHODS; it also does accept regex
// Use case here is that everything that made it here should get the 404 page since this is waterfall
app.all("*", (req, res) => {
  // Note: Status will be 200 since it will find the "404.html file"
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    // Note: Can be tested with Postman
    res.json({ err: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
