var gulp = require('gulp');
var livereload = require('gulp-livereload');
var webpack = require('webpack-stream')
var staticHash = require('gulp-static-hash');
var uglify = require('gulp-uglify');
var cordova = require('cordova')
var rimraf = require('rimraf')
var runSequence = require('run-sequence')

var platforms = require('./platforms/platforms.json')

var tasks = {
  webpack: function() {
    return gulp.src('./www/js/index.jsx')
      .pipe(webpack(require('./webpack.config')))
      .pipe(gulp.dest('./www/js/'))
  }
}

gulp.task('webpack', tasks.webpack)

gulp.task('livereload', function() {
  var stream = tasks.webpack()
  for (var platform in platforms) {
    stream = stream.pipe(gulp.dest('./platforms/' + platform + '/www/js'))
  }
  return stream.pipe(livereload())
})

gulp.task('watch', ['livereload'], function() {
  livereload.listen({port: <%= livereload.port %>})
  runSequence('serve')
  gulp.watch('./www/**/*.jsx', ['livereload'])
})

gulp.task('build', function(cb) {
    return runSequence('webpack', 'uglify', 'hash')
})

gulp.task('cordova:prepare', function(cb) {
    return cordova.prepare(cb)
})

gulp.task('prepare', function(cb) {
    return runSequence('build', 'cordova:prepare', 'clean', cb)
})

gulp.task('serve', function(cb) {
    return cordova.serve(cb)
})

gulp.task('hash', function() {
    return gulp.src(['www/*.html'])
        .pipe(staticHash({asset: 'www/js'}))
        .pipe(gulp.dest('www'));
});

gulp.task('uglify', function () {
    return gulp.src(['www/js/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('www/js'));
});

gulp.task('clean', function(cb) {
    return rimraf('./platforms/**/www/js/**/*.jsx', cb)
})
