"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadAvatar = exports.uploadVideo = exports.onlyPrivate = exports.onlyPublic = exports.localsMiddlewares = void 0;

var _routes = _interopRequireDefault(require("./routes"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

var s3 = new _awsSdk.default.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
var multerVideo = (0, _multer.default)({
  storage: (0, _multerS.default)({
    s3: s3,
    acl: "public-read",
    bucket: "hoontube/video"
  })
});
var multerAvatar = (0, _multer.default)({
  storage: (0, _multerS.default)({
    s3: s3,
    acl: "public-read",
    bucket: "hoontube/avatar"
  })
});

var localsMiddlewares = function localsMiddlewares(req, res, next) {
  res.locals.siteName = "HoonTube";
  res.locals.routes = _routes.default;
  res.locals.loggedUser = req.user || null;
  next();
};

exports.localsMiddlewares = localsMiddlewares;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes.default.home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes.default.home);
  }
};

exports.onlyPrivate = onlyPrivate;
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;