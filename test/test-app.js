'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('cordova-react:app', function () {
  before(function (done) {
      this.timeout(5000)
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      'gulpfile.js',
      'webpack.config.js',
      '.editorconfig',
      '.jshintrc',
      '.gitignore',
      'www'
    ]);
  });
});
