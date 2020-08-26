"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("./db");

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./models/Video");

require("./models/Comment");

_dotenv.default.config();

var PORT = process.env.PORT;

var handleListening = function handleListening() {
  return console.log("\u2705 Listening on: http://localhost:".concat(PORT));
};

_app.default.listen(PORT, handleListening);