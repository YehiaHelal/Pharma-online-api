require("dotenv").config();

//main
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// routes
const itemsRoutes = require("./routes/itemsRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  // res.set("Access-Control-Allow-Origin", "*");
  console.log(req.path, req.method);
  next();
});

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://pharma-online-frontend-production.up.railway.app"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cookieParser()); // To parse the incoming cookies
app.use(
  cors({
    origin: "*",
    "Access-Control-Allow-Origin": "*",

    credentials: true,
    headers: {
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      //   },
    },
  })
  //   {
  //   origin: "https://pharma-online-frontend-production.up.railway.app",
  //   credentials: true,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //   },
  // }
);

// // routes
app.use("/api/users", authRoutes); // for users
app.use("/api/items", itemsRoutes); // for items
app.use("/api/orders", orderRoutes); // for orders

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
``;
