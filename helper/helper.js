const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");
const axios = require("axios");

// <-------------------- API INFORMATION -------------------->
const API_KEY = process.env.REACT_APP_API_KEY;
const URL = `https://project-2-api.herokuapp.com/videos?api_key=${API_KEY}`;

/**
 * 
 * @returns a unique ID from the uuid module
 */
const newId = () => {
  return uuidv4();
};

/**
 * A function that allows you to write to a file
 * in a human readable format
 */
const writeJSONFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (error) => {
    if (error) console.log(error);
    console.log(`Changes saves to: ${filename}.`);
  });
};
// <-------------------- AXIOS (GET) FOR FETCHING VIDEOS -------------------->
axios.get(URL).then((response) => {
  if (!fs.existsSync("data")) {
    fs.mkdir("data", (error) => {
      if (error) console.log("Error occured while creating the directory...");
    });
  }
  fs.writeFile(`data/videos.json`, JSON.stringify(response.data), (error) => {
    if (error) console.log("Error while writing to the file!");
    console.log("Writing to the file was successful!");
  });
});
// <-------------------- AXIOS (GET) FOR FETCHING VIDEOS DETAILS -------------------->

// <-------------------- EXPORTING FUNCTIONS -------------------->
module.exports = {
  newId,
  writeJSONFile,
};
