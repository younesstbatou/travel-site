var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');



var config = {
  shape:{
    spacing:{
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSVGwithPNG: function(){
          return function(sprite, render){
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',
      render:{
        css:{
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

gulp.task('beginClean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
})

//this task responsible for transforming all SVG icons file in one single SVG file by using 'svgSprite' and pipe it to './temp/sprite'
gulp.task('creatSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPngCopy',['creatSprite'] , function(){
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
})


gulp.task('copySpriteGRAPHIC', ['createPngCopy'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});


//this task responsible for copy sprite.css from ./temp to ./modules and rename it (_sprite.css) by using 'gulp-rename'
gulp.task('copySpriteCSS', ['creatSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'))
});

gulp.task('endClean', ['copySpriteGRAPHIC', 'copySpriteCSS'], function() {
  return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'creatSprite', 'createPngCopy', 'copySpriteGRAPHIC', 'copySpriteCSS', 'endClean']);
