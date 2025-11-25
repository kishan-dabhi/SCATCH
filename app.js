const express = require("express");
const app = express();
const cookiesparser = require("cookie-parser");
const path = require("path");
const userRouters = require("./routes/usersRouters");
const ownerRouters = require("./routes/ownersRouters");
const productRouters = require("./routes/productsRouters");
const expressSession = require("express-session");
const indexRouter = require("./routes/index");
const flash = require("connect-flash");

require("dotenv").config();
require("./config/mongoose-connection"); // DB connect

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesparser());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_KEY,
  })
);

// CONNECT FLASH
app.use(flash());

// FLASH MIDDLEWARE (IMPORTANT)
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.static(path.join(__dirname, "public")));

// EJS
app.set("view engine", "ejs");

// ROUTES
app.use("/", indexRouter);
app.use("/users", userRouters);
app.use("/owners", ownerRouters);
app.use("/products", productRouters);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
