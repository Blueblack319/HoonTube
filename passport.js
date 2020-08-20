import dotenv from "dotenv";
import passport from "passport";
import User from "./models/User";
import GitHubStrategy from "passport-github";
import { githubLoginCallBack } from "./controllers/userController";

dotenv.config();

passport.use(User.createStrategy());
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://127.0.0.1:${process.env.PORT}/auth/github/callback`,
    },
    githubLoginCallBack
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
