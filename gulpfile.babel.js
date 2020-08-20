import gulp from "gulp";
import del from "del";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";

sass.compiler = require("node-sass");

const clean = () => del("dist", ".publish");

const routes = {
  style: {
    src: "src/scss/*.scss",
    dist: "dist/css/",
    watch: "src/scss/**/*.scss",
  },
  js: {
    src: "src/js/*.js",
    dist: "dist/js/",
    watch: "src/js/**/*.js",
  },
};

const watch = () => {
  gulp.watch(routes.style.watch, style);
  gulp.watch(routes.js.watch, js);
};

const style = () =>
  gulp
    .src(routes.style.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ flexbox: true, grid: "autoplace" }))
    .pipe(minify())
    .pipe(gulp.dest(routes.style.dist));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dist));

const prepare = gulp.series([clean]);
const assets = gulp.series([style, js]);
const live = gulp.series([watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([dev, clean]);
