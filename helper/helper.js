const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");
const axios = require("axios");

// <-------------------- API INFORMATION -------------------->
const API_KEY = process.env.API_KEY;
const URL = `https://project-2-api.herokuapp.com/videos?api_key=${API_KEY}`;
const DETAILS_URL = `https://project-2-api.herokuapp.com/videos/84e96018-4022-434e-80bf-000ce4cd12b8?api_key=${API_KEY}`;

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

// <-------------------- EXPORTING FUNCTIONS -------------------->
module.exports = {
  newId,
  writeJSONFile,
};
