'use strict';

const { watch, dest, src } = require('gulp');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

function javascript() {
  return src('./index.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(dest('./'));
};

function build(cb) {
  watch('./index.js', javascript)
  cb();
};

export default build;