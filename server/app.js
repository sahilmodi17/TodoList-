require("dotenv").config();
const express = require("express");
const app = express();
const cors =require("cors")
app.use(express.json());
app.use(cors());

//  router

const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const authentication = require('./middleware/authentication')
app.use("/api/v1/", authRouter);
app.use("/api/v1/",authentication, todoRouter);

//  middleware

const notFoundMiddleWare = require("./middleware/Not-Found");
app.use(notFoundMiddleWare);

//  connect Db

const connectDB = require("./db/connect");
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log("server is listening port", port));
  } catch (error) {
    // throw new Error("unable to connect");
    console.log(error, "msg");
  }
};

start();
