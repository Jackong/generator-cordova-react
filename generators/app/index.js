'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var shell = require('shelljs')

module.exports = yeoman.generators.Base.extend({
  init: function () {
    this.log(yosay(
      'Welcome to the shining ' + chalk.red('CordovaReact') + ' generator!'
    ));
    this.livereload = {
        port: 35729
    }
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
            appname: this.appname,
            name: this.user.git.name(),
            email: this.user.git.email()
        }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {
            appname: this.appname,
            name: this.user.git.name(),
            email: this.user.git.email()
        }
      );
    },
    gulp: function() {
        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'),
            {
                livereload: this.livereload
            }
        )
    },
    webpack: function() {
        this.fs.copy(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        )
    },
    www: function() {
        this.fs.copyTpl(
            this.templatePath('www'),
            this.destinationPath('www'),
            {
                appname: this.appname,
                livereload: this.livereload
            }
        )
    },
    platforms: function() {
        shell.exec('cordova platform add browser')
    },
    plugins: function() {
        shell.exec('cordova plugin add pro.fing.cordova.gapreload')
        shell.exec('cordova plugin add cordova-plugin-console')
        shell.exec('cordova plugin add cordova-plugin-device')
    },
    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      )
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      )
      this.fs.copy(
          this.templatePath('gitignore'),
          this.destinationPath('.gitignore')
      )
    }
  },

  install: function () {
    this.installDependencies();
  }
});
