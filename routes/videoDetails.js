// <-------------------- IMPORTS -------------------->
const express = require("express");
const path = require("node:path");
const router = express.Router();

// <-------------------- FUNCTION IMPORTS -------------------->
const { newId, writeJSONFile } = require("../helper/helper");

// <-------------------- JSON IMPORTS -------------------->
// The videos data
const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);

module.exports = router;
