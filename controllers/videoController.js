import routes from "../routes";
import Comment from "../models/Comment";
import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageName: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageName: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageName: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageName: "Upload" });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageName: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageName: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findByIdAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    const user = await User.findById(req.user.id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
      await video.comments.forEach(async (id) => {
        await Comment.findByIdAndRemove({ _id: id });
        console.log("Here");
        await user.comments.forEach((item, index, comments) => {
          console.log(item, id, typeof item, typeof id);
          if (item == id) {
            comments.splice(index, 1);
            console.log("done");
            user.save();
          }
        });
      });
      await user.videos.forEach((item, index, videos) => {
        if (item == id) {
          videos.splice(index, 1);
          user.save();
        }
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(routes.home);
  }
};

// Register Video View (API)

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    user.comments.push(newComment.id);
    video.save();
    user.save();
    res.send(newComment.id);
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Delete Comment

export const postDeleteComment = async (req, res) => {
  const {
    params: { videoId, commentId },
  } = req;
  try {
    const video = await Video.findById(videoId);
    const user = await User.findById(req.user.id);
    if (video.creator == req.user.id) {
      await Comment.findByIdAndDelete({ _id: commentId });
      await user.comments.forEach((item, index, comments) => {
        if (item == commentId) {
          comments.splice(index, 1);
          user.save();
        }
      });
      await video.comments.forEach((item, index, comments) => {
        if (item == commentId) {
          comments.splice(index, 1);
          video.save();
        }
      });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
