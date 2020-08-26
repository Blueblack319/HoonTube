import del from "del";
import gulp from "gulp";
import gPug from "gulp-pug";
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
  pug: {
    src: "src/views/**/*.pug",
    dist: "dist/views/",
    watch: "src/views/**/*.pug",
  },
};

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.style.watch, style);
  gulp.watch(routes.js.watch, js);
};

const pug = () => {
  gulp.src(routes.pug.src).pipe(gPug()).pipe(gulp.dest(routes.pug.dist));
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

const assets = gulp.series([style, js]);
const live = gulp.series([watch]);

// Prepare
export const prepare = gulp.series([clean]);
export const dev = gulp.series([assets, live]);
export const deploy = gulp.series([dev, clean]);
