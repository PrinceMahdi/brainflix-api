// <-------------------- IMPORTS -------------------->
const express = require("express");
const axios = require("axios");
const fs = require("node:fs");

// <-------------------- API INFORMATION -------------------->
const API_KEY = process.env.REACT_APP_API_KEY;
const URL = `https://project-2-api.herokuapp.com/videos${API_KEY}`;

const fetchVideos = async () => {
  try {
    const { data } = axios.get(URL);
    console.log(data);
  } catch (error) {
    console.log(
      `Something went wrong while retrieving information from the API ::: ${error}`
    );
  }
};

fetchVideos();


