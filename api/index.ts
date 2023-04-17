const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const meals = require("./routes/meals");
const orders = require("./routes/orders");
const auth = require("./routes/authentication");
const users = require("./routes/users");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/meals", meals);
app.use("/orders", orders);
app.use("/auth", auth);
app.use("/users", users);

module.exports = app;
