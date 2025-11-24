const express = require("express");
const app = express();
const cookiesparser = require("cookie-parser");
const path = require("path");
const userRouters = require("./routes/usersRouters");
const ownerRouters = require("./routes/ownersRouters");
const productRouters = require("./routes/productsRouters");


const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesparser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/users", userRouters);
app.use("/owners", ownerRouters);
app.use("/products", productRouters);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
