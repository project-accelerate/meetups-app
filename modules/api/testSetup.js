/* eslint-disable import/no-extraneous-dependencies */

import "babel-polyfill";

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "development.env") });
require("dotenv").config({
  path: path.join(__dirname, "development.default.env")
});
