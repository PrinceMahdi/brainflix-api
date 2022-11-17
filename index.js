// <-------------------- IMPORTS -------------------->
const express = require("express");
const cors = require("cors");
const path = require("node:path");

// <------------------- INITIALIZE THE EXPRESS SERVER ------------------->
const app = express();

// <-------------------- FOR .env FILES -------------------->
require("dotenv").config();

// <-------------------- ROUTES IMPORTS -------------------->
const videoRouter = require("./routes/videos");
const videoDetailsRouter = require("./routes/videoDetails");

// <-------------------- MIDDLEWARE -------------------->
app.use(express.json());
app.use(cors());

// <-------------------- SERVING ALL STATIC FILES -------------------->
app.use(express.static(path.join(__dirname, "public")));

// <-------------------- SERVING STATIC RESOURCES TO CLIENT -------------------->
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// <-------------------- ROUTES -------------------->
// Videos Route
app.use("/videos", videoRouter);

// <-------------------- SERVER LISTENING FOR CHANGES -------------------->
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`⭐️ ::: Server is running on port (${PORT}) ::: ⭐️`);
});
