var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    gutil = require('gulp-util'),
    del = require('del');

var COFFEESCRIPT_SOURCES = 'coffee/**/*.coffee';
var JS_DESTINATION = 'js/';

gulp.task('coffee-clean', function(cb) {
	del([
		JS_DESTINATION + '**/*'
	], cb);
});

var coffeeCompile = function() {
  gulp.src([COFFEESCRIPT_SOURCES])
    .pipe(coffee({bare: false}).on('error', function(error) {
      console.log("ERROR: " + error);
    }))
    .pipe(gulp.dest(JS_DESTINATION));
};

gulp.task('coffee-compile', coffeeCompile);

gulp.task('coffee-clean-compile', ['coffee-clean'], coffeeCompile);

gulp.task('watch-coffee', function() {
  gulp.watch(COFFEESCRIPT_SOURCES, ['coffee-compile']);
});

gulp.task('default', ['coffee-clean-compile', 'watch-coffee']);