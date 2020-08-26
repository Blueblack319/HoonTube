"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _userController = require("../controllers/userController");

var _videoController = require("../controllers/videoController");

var _middlewares = require("../middlewares");

var globalRouter = _express.default.Router();

globalRouter.get(_routes.default.home, _videoController.home);
globalRouter.get(_routes.default.join, _middlewares.onlyPublic, _userController.getJoin);
globalRouter.post(_routes.default.join, _middlewares.onlyPublic, _userController.postJoin, _userController.postLogin);
globalRouter.get(_routes.default.login, _middlewares.onlyPublic, _userController.getLogin);
globalRouter.post(_routes.default.login, _middlewares.onlyPublic, _userController.postLogin);
globalRouter.get(_routes.default.github, _middlewares.onlyPublic, _userController.githubLogin);
globalRouter.get(_routes.default.githubCallback, _passport.default.authenticate("github", {
  failureRedirect: _routes.default.login
}), _userController.postGithubLogin);
globalRouter.get(_routes.default.facebook, _middlewares.onlyPublic, _userController.facebookLogin);
globalRouter.get(_routes.default.facebookCallback, _passport.default.authenticate("facebook", {
  failureRedirect: _routes.default.login
}), _userController.postFacebookLogin);
globalRouter.get(_routes.default.logout, _middlewares.onlyPrivate, _userController.logout);
globalRouter.get(_routes.default.search, _videoController.search);
var _default = globalRouter;
exports.default = _default;