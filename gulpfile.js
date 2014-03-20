var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function () {
  gulp.src('./styles/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('./build/styles'));
});

gulp.task('default', ['styles']);
