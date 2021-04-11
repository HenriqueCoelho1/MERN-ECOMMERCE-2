const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
app.use(morgan("dev"));
app.use(cors());

// routes middleware
fs.readdirSync('backend/routes').map((r) => app.use("/api", require("./routes/" + r)));

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running on Port ${process.env.NODE_ENV} on port ${PORT}`))
