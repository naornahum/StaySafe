const gulp = require("gulp");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const { exec } = require("child_process");
const webpackConfig = require("./webpack.config.js");

// Removes previous dist
gulp.task("start", () => {
  return gulp.src("./dist", { allowEmpty: true }).pipe(clean());
});

// Creates js bundle from several js files
gulp.task("build", () => {
  return webpack(webpackConfig).pipe(gulp.dest("./dist"));
});

// Converts scss to css
gulp.task("scss", () => {
  return gulp
    .src("./src/client/style/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/style"));
});

// Transfers html
gulp.task("index-html", () => {
  return gulp.src(["./src/client/html/*"]).pipe(gulp.dest("./dist/html"));
});

// Transfers index
gulp.task("index", () => {
  return gulp.src(["./src/client/favicon.ico"]).pipe(gulp.dest("./dist"));
});

// Transfers img
gulp.task("img", () => {
  return gulp.src(["./src/client/img/*"]).pipe(gulp.dest("./dist/img"));
});

// Transfers server
gulp.task("trans-server", () => {
  return gulp.src(["./src/server/*"]).pipe(gulp.dest("./dist"));
});

// Browser Sync
gulp.task("browser-sync", () => {
  browserSync.init({
    browser: "default",
    port: 4000,
    server: { baseDir: "./dist/html" },
  });
});

// Browser Sync live reload
gulp.task("browser-sync-watch", () => {
  gulp.watch("./dist/style/*.css").on("change", browserSync.reload);
  gulp.watch("./dist/app.js").on("change", browserSync.reload);
  gulp.watch("./dist/html/*.html").on("change", browserSync.reload);
});

// Watch scss files
gulp.task("watch-scss", () => {
  return gulp.watch("./src/client/**/*.scss", gulp.series("scss"));
});

// Watch html files
gulp.task("watch-html", () => {
  return gulp.watch("./src/client/html/*.html", gulp.series("index"));
});

// Watch img files
gulp.task("watch-img", () => {
  return gulp.watch("./src/client/img/*", gulp.series("img"));
});

// Watch tsc files
gulp.task("watch-tsc", () => {
  return gulp.watch("./dist/tsc/**/*.js", gulp.series("build"));
});

// Initial ts compile
gulp.task("tsc", (cb) => {
  exec("tsc", (err, msg) => {
    cb();
  });
});

// Watch ts files and recompile
gulp.task("tsc-w", () => {
  exec("tsc -w");
});

// Start express
gulp.task("express", () => {
  const tsc = exec("nodemon --watch ./src/server ./src/server/server.ts");
  tsc.stdout.on("data", (data) => console.log(data));
  tsc.stderr.on("data", (data) => console.error(data));
});

// Heroku copy dist files
gulp.task("heroku-copy-dist", () => {
  return gulp
    .src([
      "./dist/app.js",
      "./dist/app.js.map",
      "./dist/favicon.ico",
      "./dist/html/index.html",
      "./dist/styles.css",
    ])
    .pipe(gulp.dest("./deploy/dist"));
});

// Heroku copy root files
gulp.task("heroku-copy-root", () => {
  return gulp
    .src([
      "./package.json",
      "./package-lock.json",
      "./Procfile",
      "./dist/server/server.js",
    ])
    .pipe(gulp.dest("./deploy"));
});

// Heroku clean files
gulp.task("heroku-clean", () => {
  return gulp
    .src(
      [
        "./deploy/server.js",
        "./deploy/Procfile",
        "./deploy/package.json",
        "./deploy/package-lock.json",
        "./deploy/dist",
      ],
      { allowEmpty: true }
    )
    .pipe(clean());
});

// Heroku deploy
gulp.task(
  "deploy",
  gulp.series("heroku-clean", "build", "heroku-copy-root", "heroku-copy-dist")
);

// Run all together
gulp.task(
  "default",
  gulp.series(
    "start",
    "scss",
    "index",
    "index-html",
    "tsc",
    "img",
    "trans-server",
    "build",
    gulp.parallel(
      "browser-sync",
      "browser-sync-watch",
      "watch-scss",
      "watch-html",
      "watch-img",
      "watch-tsc",
      "tsc-w",
      "express"
    )
  )
);
