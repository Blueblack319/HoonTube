"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postDeleteComment = exports.postAddComment = exports.postRegisterView = exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _routes = _interopRequireDefault(require("../routes"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _User = _interopRequireDefault(require("../models/User"));

var _Video = _interopRequireDefault(require("../models/Video"));

var home = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var videos;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video.default.find({}).sort({
              _id: -1
            });

          case 3:
            videos = _context.sent;
            res.render("home", {
              pageName: "Home",
              videos: videos
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.render("home", {
              pageName: "Home",
              videos: []
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var searchingBy, videos;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term;
            videos = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _Video.default.find({
              title: {
                $regex: searchingBy,
                $options: "i"
              }
            });

          case 5:
            videos = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 11:
            res.render("search", {
              pageName: "Search",
              searchingBy: searchingBy,
              videos: videos
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.search = search;

var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageName: "Upload"
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var _req$body, title, description, location, newVideo;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, location = req.file.location;
            _context3.next = 3;
            return _Video.default.create({
              fileUrl: location,
              title: title,
              description: description,
              creator: req.user.id
            });

          case 3:
            newVideo = _context3.sent;
            req.user.videos.push(newVideo.id);
            req.user.save();
            res.redirect(_routes.default.videoDetail(newVideo.id));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postUpload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var videoDetail = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
    var id, video;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Video.default.findById(id).populate("creator").populate("comments");

          case 4:
            video = _context4.sent;
            res.render("videoDetail", {
              pageName: video.title,
              video: video
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

  return function videoDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.videoDetail = videoDetail;

var getEditVideo = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res) {
    var id, video;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Video.default.findById(id);

          case 4:
            video = _context5.sent;

            if (!(video.creator != req.user.id)) {
              _context5.next = 9;
              break;
            }

            throw Error();

          case 9:
            res.render("editVideo", {
              pageName: "Edit ".concat(video.title),
              video: video
            });

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            res.redirect(_routes.default.home);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function getEditVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(req, res) {
    var id, _req$body2, title, description;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context6.prev = 1;
            _context6.next = 4;
            return _Video.default.findByIdAndUpdate({
              _id: id
            }, {
              title: title,
              description: description
            });

          case 4:
            res.redirect(_routes.default.videoDetail(id));
            _context6.next = 11;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);
            res.redirect(_routes.default.home);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postEditVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;

var deleteVideo = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(req, res) {
    var id, video, user;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return _Video.default.findById(id);

          case 4:
            video = _context8.sent;
            _context8.next = 7;
            return _User.default.findById(req.user.id);

          case 7:
            user = _context8.sent;

            if (!(video.creator != req.user.id)) {
              _context8.next = 12;
              break;
            }

            throw Error();

          case 12:
            _context8.next = 14;
            return _Video.default.findOneAndRemove({
              _id: id
            });

          case 14:
            _context8.next = 16;
            return video.comments.forEach( /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(id) {
                return _regenerator.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return _Comment.default.findByIdAndRemove({
                          _id: id
                        });

                      case 2:
                        console.log("Here");
                        _context7.next = 5;
                        return user.comments.forEach(function (item, index, comments) {
                          console.log(item, id, (0, _typeof2.default)(item), (0, _typeof2.default)(id));

                          if (item == id) {
                            comments.splice(index, 1);
                            console.log("done");
                            user.save();
                          }
                        });

                      case 5:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x15) {
                return _ref8.apply(this, arguments);
              };
            }());

          case 16:
            _context8.next = 18;
            return user.videos.forEach(function (item, index, videos) {
              if (item == id) {
                videos.splice(index, 1);
                user.save();
              }
            });

          case 18:
            _context8.next = 23;
            break;

          case 20:
            _context8.prev = 20;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);

          case 23:
            _context8.prev = 23;
            res.redirect(_routes.default.home);
            return _context8.finish(23);

          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 20, 23, 26]]);
  }));

  return function deleteVideo(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); // Register Video View (API)


exports.deleteVideo = deleteVideo;

var postRegisterView = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(req, res) {
    var id, video;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id;
            _context9.prev = 1;
            _context9.next = 4;
            return _Video.default.findById(id);

          case 4:
            video = _context9.sent;
            video.views += 1;
            video.save();
            res.status(200);
            _context9.next = 13;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](1);
            res.status(400);

          case 13:
            _context9.prev = 13;
            res.end();
            return _context9.finish(13);

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 10, 13, 16]]);
  }));

  return function postRegisterView(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}(); // Add Comment


exports.postRegisterView = postRegisterView;

var postAddComment = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(req, res) {
    var id, comment, user, video, newComment;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            _context10.prev = 1;
            _context10.next = 4;
            return _Video.default.findById(id);

          case 4:
            video = _context10.sent;
            _context10.next = 7;
            return _Comment.default.create({
              text: comment,
              creator: user.id
            });

          case 7:
            newComment = _context10.sent;
            video.comments.push(newComment.id);
            user.comments.push(newComment.id);
            video.save();
            user.save();
            res.send(newComment.id);
            res.status(200);
            _context10.next = 19;
            break;

          case 16:
            _context10.prev = 16;
            _context10.t0 = _context10["catch"](1);
            res.status(400);

          case 19:
            _context10.prev = 19;
            res.end();
            return _context10.finish(19);

          case 22:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 16, 19, 22]]);
  }));

  return function postAddComment(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}(); // Delete Comment


exports.postAddComment = postAddComment;

var postDeleteComment = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(req, res) {
    var _req$params, videoId, commentId, video, user;

    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _req$params = req.params, videoId = _req$params.videoId, commentId = _req$params.commentId;
            _context11.prev = 1;
            _context11.next = 4;
            return _Video.default.findById(videoId);

          case 4:
            video = _context11.sent;
            _context11.next = 7;
            return _User.default.findById(req.user.id);

          case 7:
            user = _context11.sent;

            if (!(video.creator == req.user.id)) {
              _context11.next = 15;
              break;
            }

            _context11.next = 11;
            return _Comment.default.findByIdAndDelete({
              _id: commentId
            });

          case 11:
            _context11.next = 13;
            return user.comments.forEach(function (item, index, comments) {
              if (item == commentId) {
                comments.splice(index, 1);
                user.save();
              }
            });

          case 13:
            _context11.next = 15;
            return video.comments.forEach(function (item, index, comments) {
              if (item == commentId) {
                comments.splice(index, 1);
                video.save();
              }
            });

          case 15:
            res.status(200);
            _context11.next = 22;
            break;

          case 18:
            _context11.prev = 18;
            _context11.t0 = _context11["catch"](1);
            console.log(_context11.t0);
            res.status(400);

          case 22:
            _context11.prev = 22;
            res.end();
            return _context11.finish(22);

          case 25:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 18, 22, 25]]);
  }));

  return function postDeleteComment(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();

exports.postDeleteComment = postDeleteComment;