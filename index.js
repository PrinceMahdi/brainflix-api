// <-------------------- IMPORTS -------------------->
const express = require("express");
const axios = require("axios");
const fs = require("node:fs");
const path = require("node:path");

// <-------------------- API INFORMATION -------------------->
const API_KEY = process.env.REACT_APP_API_KEY;
const URL = `https://project-2-api.herokuapp.com/videos?api_key=${API_KEY}`;

// <-------------------- FUNCTION IMPORTS -------------------->
const { newId, writeJSONFile } = require("./helper/helper");

// <-------------------- INITIALIZE THE EXPRESS SERVER -------------------->
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



// <-------------------- SERVER LISTENING FOR CHANGES -------------------->
app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
