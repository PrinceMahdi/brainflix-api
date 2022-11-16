// <-------------------- IMPORTS -------------------->
const express = require("express");
const path = require("node:path");
const router = express.Router();

// <-------------------- FUNCTION IMPORTS -------------------->
const { newId, writeJSONFile } = require("../helper/helper");

// <-------------------- JSON IMPORTS -------------------->
// The videos data
const videoDetailsJSONFile = path.join(__dirname, "../data/video-details.json");
const videoDetails = require(videoDetailsJSONFile);

// <-------------------- (GET) ALL VIDEOS -------------------->
router.get("/", (_req, res) => {
  try {
    res.status(200).json(videoDetails);
  } catch (error) {
    console.log("::: Couldn't retrieve the videos :::", error);
  }
});
// <-------------------- (GET) ALL VIDEOS BY ID -------------------->
router.get("/:id", (req, res) => {
  const found = videoDetails.find((video) => video.id === req.params.id);

  found
    ? res.status(200).json(found)
    : res.status(404).json({
        error: `Video with ID ---[${req.params.id}]--- was not found`,
      });
});
// <-------------------- (POST) VIDEOS -------------------->
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Please be sure to provide a title and a description." });
  }

  const newVideo = {
    title,
    description,
    id: newId(),
  };

  // Updateing the JSON file with the new video information
  videoDetails.push(newVideo);
  writeJSONFile(videoDetailsJSONFile, videoDetails);

  // Responding to the client with the new video
  res.status(201).json(newVideo);
});

// <-------------------- EXPORTS -------------------->
module.exports = router;
