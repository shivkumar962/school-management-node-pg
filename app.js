require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
// const multer = require('multer')

const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use( cors({
    //origin: process.env.CLIENT_URL
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // folder to upload files

global.__basedir = __dirname; // very important to define base directory of the project. this is useful while creating upload scripts

// Routes
app.get("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "Welcome 🙏",
    });
  } catch (err) {
    return next(err);
  }
});

const userRoute = require("./routes/userRoute");
const designRoute = require("./routes/designRoute");
const mediaRoute = require("./routes/mediaRoute");
const studentRoute = require("./routes/studentRoute");
const staffRoute = require("./routes/staffRoute");
const parentRoute = require("./routes/parentRoute");
const classRoute = require("./routes/classRoute");
const examRoute = require("./routes/examRoute");
app.use([
  userRoute,
  designRoute,
  mediaRoute,
  studentRoute,
  staffRoute,
  parentRoute,
  classRoute,
  examRoute
]); // you can add more routes in this array

// const userRoute = require('./routes/userRoute');
// const designRoute = require('./routes/designRoute');
// const mediaRoute = require('./routes/mediaRoute');
// app.use([ userRoute, designRoute, mediaRoute]); // you can add more routes in this array

//404 error
app.get("*", function (req, res) {
  res.status(404).json({
    message: "What?? 🙅",
  });
});

//An error handling middleware
app.use((err, req, res, next) => {
  console.log("🐞 Error Handler");

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
  });
});

// Run the server
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`🐹 app listening on http://localhost:${port}`)
);
