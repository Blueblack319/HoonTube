"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.getMe = exports.logout = exports.postFacebookLogin = exports.facebookLoginCallback = exports.facebookLogin = exports.postGithubLogin = exports.githubLoginCallBack = exports.githubLogin = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageName: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password !== password2)) {
              _context.next = 6;
              break;
            }

            res.status(400);
            res.render("join", {
              pageName: "Join"
            });
            _context.next = 19;
            break;

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _User.default)({
              name: name,
              email: email
            });

          case 9:
            user = _context.sent;
            _context.next = 12;
            return _User.default.register(user, password);

          case 12:
            next();
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);
            res.redirect(_routes.default.home);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageName: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = _passport.default.authenticate("local", {
  failureRedirect: _routes.default.login,
  successRedirect: _routes.default.home
});

exports.postLogin = postLogin;

var githubLogin = _passport.default.authenticate("github");

exports.githubLogin = githubLogin;

var githubLoginCallBack = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, __, profile, cb) {
    var _profile$_json, id, avatar_url, name, email, user, newUser;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _profile$_json = profile._json, id = _profile$_json.id, avatar_url = _profile$_json.avatar_url, name = _profile$_json.name, email = _profile$_json.email;
            _context2.prev = 1;
            _context2.next = 4;
            return _User.default.findOne({
              email: email
            });

          case 4:
            user = _context2.sent;

            if (!user) {
              _context2.next = 13;
              break;
            }

            user.githubId = id;
            user.avatarUrl = avatar_url;
            user.name = name;
            user.save();
            return _context2.abrupt("return", cb(null, user));

          case 13:
            _context2.next = 15;
            return _User.default.create({
              name: name,
              githubId: id,
              email: email,
              avatarUrl: avatar_url
            });

          case 15:
            newUser = _context2.sent;
            cb(null, newUser);

          case 17:
            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            cb(_context2.t0);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 19]]);
  }));

  return function githubLoginCallBack(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.githubLoginCallBack = githubLoginCallBack;

var postGithubLogin = function postGithubLogin(req, res) {
  res.redirect(_routes.default.home);
};

exports.postGithubLogin = postGithubLogin;

var facebookLogin = _passport.default.authenticate("facebook");

exports.facebookLogin = facebookLogin;

var facebookLoginCallback = function facebookLoginCallback(accessToken, refreshToken, profile, cb) {
  console.log(accessToken, refreshToken, profile, cb);
};

exports.facebookLoginCallback = facebookLoginCallback;

var postFacebookLogin = function postFacebookLogin(req, res) {
  res.redirect(_routes.default.home);
};

exports.postFacebookLogin = postFacebookLogin;

var logout = function logout(req, res) {
  req.logout();
  res.redirect(_routes.default.home);
};

exports.logout = logout;

var getMe = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res.render("userDetail", {
              pageName: "Me",
              user: req.user
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getMe(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getMe = getMe;

var userDetail = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
    var id, user;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _User.default.findById(id);

          case 4:
            user = _context4.sent;
            res.render("userDetail", {
              pageName: "User Detail",
              user: user
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            res.redirect(_routes.default.home);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function userDetail(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var getEditProfile = function getEditProfile(req, res) {
  return res.render("editProfile", {
    pageName: "Edit Profile"
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res) {
    var _req$body2, name, email, file;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, file = req.file;
            _context5.prev = 1;
            _context5.next = 4;
            return _User.default.findByIdAndUpdate(req.user.id, {
              name: name,
              email: email,
              avatarUrl: file ? file.location : req.user.avatarUrl
            });

          case 4:
            res.redirect("/users".concat(_routes.default.me));
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](1);
            res.redirect("/users".concat(_routes.default.editProfile));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 7]]);
  }));

  return function postEditProfile(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  return res.render("changePassword", {
    pageName: "Change Password"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(req, res) {
    var _req$body3, oldPassword, newPassword, newPassword1, user;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPassword1 = _req$body3.newPassword1;
            console.log(oldPassword, newPassword, newPassword1);
            _context6.prev = 2;

            if (!(newPassword !== newPassword1)) {
              _context6.next = 8;
              break;
            }

            res.status(400);
            res.redirect("/users".concat(_routes.default.changePassword));
            _context6.next = 15;
            break;

          case 8:
            _context6.next = 10;
            return _User.default.findById(req.user.id);

          case 10:
            user = _context6.sent;
            _context6.next = 13;
            return user.changePassword(oldPassword, newPassword);

          case 13:
            user.save();
            res.redirect("/users".concat(_routes.default.me));

          case 15:
            _context6.next = 22;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6["catch"](2);
            console.log(_context6.t0);
            res.status(400);
            res.redirect("/users".concat(_routes.default.changePassword));

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 17]]);
  }));

  return function postChangePassword(_x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;