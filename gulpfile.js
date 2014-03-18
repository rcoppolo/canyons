var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function () {
  gulp.src('./styles/main.sass')
  .pipe(sass())
  .pipe(gulp.dest('./build/css'));
});

gulp.task('default', ['styles']);
