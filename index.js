const express = require("express");
const dbConnect = require("./config/dbConnect.js");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/allRoute.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', (req, res) =>{
//     res.send('Hello from server side');
// });

app.use("/api/", authRouter);


app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
