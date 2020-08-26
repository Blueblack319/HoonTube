"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var apiRouter = _express.default.Router();

apiRouter.post(_routes.default.registerView, _videoController.postRegisterView);
apiRouter.post(_routes.default.addComment, _videoController.postAddComment);
apiRouter.post(_routes.default.deleteComment, _videoController.postDeleteComment);
var _default = apiRouter;
exports.default = _default;