var gulp = require('gulp');
var sass = require('gulp-sass');
var sass = require('gulp-react');

gulp.task('styles', function () {
  gulp.src('./styles/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('./build/styles'));
});

gulp.task('scripts', function () {
  gulp.src('./scripts/*.jsx')
  .pipe(react())
  .pipe(gulp.dest('./build/scripts'));
});

gulp.task('default', ['styles']);
