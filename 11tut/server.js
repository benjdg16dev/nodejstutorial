const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// â€˜content-type: application/x-www-form-urlencodedâ€™
// Note: Works as a waterfall; If put above our routes this will apply to
// all routes that come in.
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// Serve static files
// Note: "/" for line 45
app.use(express.static(path.join(__dirname, "/public")));
// Routing
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
// Note: Before `app.use(verifyJWT)` also because the refresh route issues a new access token
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// Note: Put Verify here because routes above must have no verification to access
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

// Note: app.use() is most likely used for middleware
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
