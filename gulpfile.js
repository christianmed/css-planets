'use strict';

const gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  pref = require('gulp-autoprefixer'),
  plum = require('gulp-plumber'),
  brow = require('browser-sync'),
  reload = brow.reload;

gulp.task('pug', function() {
  return gulp.src('./dev/pug/*.pug')
    .pipe(plum())
    .pipe(pug({ pretty: true }))
    .pipe(plum.stop())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', function() {
  return gulp.src('./dev/scss/*.scss')
    .pipe(plum())
    .pipe(sass({ outputStyle: 'nested' }))
    .pipe(pref({ browsers: 'last 5 versions', cascade: true }))
    .pipe(plum.stop())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(reload({ stream: true }));
});

gulp.task('default', ['pug', 'styles'], function() {
  brow.init({server: './dist/'});

  gulp.watch('./dev/pug/*.pug', ['pug']);
  gulp.watch('./dev/scss/*.scss', ['styles']);
  gulp.watch('./dist/*.html').on('change', reload);
});
