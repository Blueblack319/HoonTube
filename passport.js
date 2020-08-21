import dotenv from "dotenv";
import passport from "passport";
import User from "./models/User";
import routes from "./routes";
import GitHubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import {
  githubLoginCallBack,
  facebookLoginCallback,
} from "./controllers/userController";

dotenv.config();

passport.use(User.createStrategy());
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://127.0.0.1:${process.env.PORT}${routes.githubCallback}`,
    },
    githubLoginCallBack
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://stupid-goat-62.serverless.social${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
