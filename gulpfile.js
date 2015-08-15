var gulp = require('gulp');

gulp.task('compile-typescript', function () {
  var ts = require('gulp-typescript');
  var babel = require('gulp-babel');
  return gulp.src(['src/*.ts', 'src/*.tsx'])
             .pipe(ts({typescript: require('typescript'), jsx: "preserve"}))
             .js
             .pipe(babel())
             .pipe(gulp.dest('dist'));
});

gulp.task('copy-static-files', function () {
  return gulp.src(['src/index.html', 'src/main.css']).pipe(gulp.dest('dist'));
});

gulp.task('build', ['compile-typescript', 'copy-static-files']);

gulp.task('deploy', ['build'], function () {
  var gitHubPages = require('gulp-gh-pages')({branch: 'master'});
  return gulp.src('dist/**/*').pipe(gitHubPages);
});

gulp.task('default', ['build']);
