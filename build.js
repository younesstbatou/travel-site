var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();


gulp.task('previewDist', function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task('deletDist', ['icons'], function(){
    return del("./docs");
});

gulp.task('CopyGeneralFiles', ['deletDist'], function(){
  var pathstoCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]

  return gulp.src(pathstoCopy)
  .pipe(gulp.dest("./docs"));
});


gulp.task('optimizeImages', ['deletDist'], function(){
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
  .pipe(gulp.dest("./docs/assets/images/"))
});

gulp.task('useminTrigger', ['deletDist'], function(){
  gulp.start("usemin");
});

gulp.task('usemin', ['scripts', 'styles'], function(){
  return gulp.src("./app/index.html")
  .pipe(usemin({
    css: [function(){return rev()},function(){return cssnano()}],
    js: [function(){return rev()}, function() {return uglify()}]
  }))
  .pipe(gulp.dest("./docs"));
});


gulp.task('build', ['deletDist', 'CopyGeneralFiles', 'optimizeImages', 'useminTrigger']);
