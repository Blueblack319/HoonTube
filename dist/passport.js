"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _passport = _interopRequireDefault(require("passport"));

var _User = _interopRequireDefault(require("./models/User"));

var _routes = _interopRequireDefault(require("./routes"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _userController = require("./controllers/userController");

_dotenv.default.config();

_passport.default.use(_User.default.createStrategy());

_passport.default.use(new _passportGithub.default({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://127.0.0.1:".concat(process.env.PORT).concat(_routes.default.githubCallback)
}, _userController.githubLoginCallBack));

_passport.default.use(new _passportFacebook.default({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: "https://stupid-goat-62.serverless.social".concat(_routes.default.facebookCallback),
  profileFields: ["id", "displayName", "photos", "email"],
  scope: ["public_profile", "email"]
}, _userController.facebookLoginCallback));

_passport.default.serializeUser(_User.default.serializeUser());

_passport.default.deserializeUser(_User.default.deserializeUser());