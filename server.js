const express = require("express");
const path = require('path')
const userRoute = require("../backend/router/userRouter");
const app = express();
require("dotenv").config();
app.use(require('nocache')())
// app.use(require('fileupload')())
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
const cors = require("cors");
app.use(cookie());
// app.use(
// //   cors({
// //     // origin: ["http://localhost:3000"],
// //     // credentials: true,
// //   })
// );
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true })
);
app.use("/images",express.static(path.join(__dirname,"uploads")));

app.use("/user", userRoute);
// app.get("/uploadimage", (req, res) => {
//   console.log("hello");
//   res.json({message:'ehlele'})
// });
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () => console.log("server started"))
  );
