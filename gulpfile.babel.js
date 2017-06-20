/*'use strict';*/

import gulp from 'gulp';
import sass from 'gulp-sass';
import livereload  from 'gulp-livereload';
import webpack from 'webpack-stream';
 
var paths = {
  scripts: 'build/js/*.js',
  sass: 'build/sass/*.scss',
  pages: '*.html',
};

gulp.task('pageReload', () => {
  return gulp.src(paths.pages)
    .pipe(livereload());
})

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css'))
    .pipe(livereload());
});
 
gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(paths.scripts, ['webpacker']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.pages, ['pageReload']);
});
 
gulp.task('webpacker', function() {
  return gulp.src('./build/js/main.js')
    .pipe(webpack({
      output: {
        filename: 'main.js'
      },
      module: {
        loaders: [{
          loader: 'babel-loader'
        }]
      }
    }))
    .pipe(gulp.dest('assets/js'))
    .pipe(livereload());
});

gulp.task('default', ['webpacker', 'sass', 'watch']);