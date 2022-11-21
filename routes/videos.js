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
router.post("/post", (req, res) => {
  const {
    title,
    description,
    channel,
    views,
    likes,
    timestamp,
    image,
    comments,
  } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Please be sure to provide a title and a description." });
  }

  const newVideo = {
    id: newId(),
    title,
    channel,
    views,
    likes,
    description,
    timestamp,
    image,
    comments,
  };

  // Updateing the JSON file with the new video information
  videoDetails.push(newVideo);
  writeJSONFile(videoDetailsJSONFile, videoDetails);

  // Responding to the client with the new video
  res.status(201).json(newVideo);
});

// <--------------------- (GET) ALL COMMENTS --------------------->
router.get("/:id/comments", (req, res) => {
  videoDetails.map((video) => {
    if (video.id === req.params.id) {
      res.status(200).json(video.comments);
    }
  });
});

// <-------------------- (POST) COMMENTS -------------------->
router.post("/:id/comments", (req, res) => {
  const { name, comment, likes, timestamp } = req.body;

  if (!comment) {
    return res
      .status(400)
      .json({ error: "Please be sure to provide a comment." });
  }

  const newComment = {
    id: newId(),
    name: "Elon Musk",
    comment,
    likes,
    timestamp,
  };

  videoDetails.map((video) => {
    if (video.id === req.params.id) {
      // Updateing the JSON file with the new video information
      video.comments.unshift(newComment);
      writeJSONFile(videoDetailsJSONFile, videoDetails);

      // Responding to the client with the new video
      res.status(201).json(video);
    }
  });
});

// <-------------------- EXPORTS -------------------->
module.exports = router;
