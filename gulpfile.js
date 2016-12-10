var gulp = require("gulp");

gulp.task("compile-typescript", function () {
  var sourcemaps = require("gulp-sourcemaps");
  var ts = require("gulp-typescript");
  var tsProject = ts.createProject("tsconfig.json");
  var babel = require("gulp-babel");
  return tsProject.src()
             .pipe(sourcemaps.init())
             .pipe(tsProject())
             .js
             .pipe(babel({presets: ["react"]}))
             .pipe(sourcemaps.write("."))
             .pipe(gulp.dest("dist"));
});

gulp.task("copy-static-files", function () {
  return gulp.src(["src/index.html", "src/main.css"]).pipe(gulp.dest("dist"));
});

gulp.task("build", ["compile-typescript", "copy-static-files"]);

gulp.task("deploy", ["build"], function () {
  var gitHubPages = require("gulp-gh-pages")({branch: "master"});
  return gulp.src("dist/**/*").pipe(gitHubPages);
});

gulp.task("default", ["build"]);
