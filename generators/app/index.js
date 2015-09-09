'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var shell = require('shelljs')

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the shining ' + chalk.red('CordovaReact') + ' generator!'
    ));
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
        this.fs.copy(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js')
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
                appname: this.appname
            }
        )
    },
    plugins: function() {
        this.log(shell.exec('cordova plugin add pro.fing.cordova.gapreload').output)
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
