'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var cordova = require('cordova')
var async = require('async')

module.exports = yeoman.generators.Base.extend({
  init: function() {
    this.log(yosay(
      'Welcome to the shining ' + chalk.red('CordovaReact') + ' generator!'
    ));
    this.livereload = {
      port: 35729
    }
  },
  prompting: function() {
    var done = this.async()
    this.prompt([{
      type: 'input',
      name: 'package',
      message: 'What would you like the package to be?',
      default: 'com.example.' + this.appname
    }, {
      type: 'checkbox',
      name: 'platforms',
      message: 'What platforms would you like to add support for?',
      choices: [{
        name: 'browser',
        value: 'browser',
        checked: true
      }, {
        name: 'ios',
        value: 'ios',
        checked: true
      }, {
        name: 'android',
        value: 'android',
        checked: true
      }]
    }, {
      type: 'checkbox',
      name: 'plugins',
      message: 'What plugins would you like to include by default?',
      choices: [{
        name: 'Console',
        value: 'cordova-plugin-console',
        checked: true
      }, {
        name: 'Device',
        value: 'cordova-plugin-device',
        checked: true
      }, {
        name: 'Dialogs',
        value: 'cordova-plugin-dialogs',
        checked: true
      }, {
        name: 'Geo Location',
        value: 'cordova-plugin-geolocation',
        checked: true
      }, {
        name: 'In App Browser',
        value: 'cordova-plugin-inappbrowser',
        checked: true
      }, {
        name: 'Splash Screen',
        value: 'cordova-plugin-splashscreen',
        checked: true
      }, {
        name: 'Network Information',
        value: 'cordova-plugin-network-information',
        checked: true
      }, {
        name: 'Gap Reload',
        value: 'pro.fing.cordova.gapreload',
        checked: true
      }]
    }], function(props) {
      this.props = props
      done()
    }.bind(this))
  },
  writing: {
    cordova: function() {
        if (this.arguments.indexOf('testing') >= 0) {
            return
        }
        var done = this.async();
        try {
            console.log('Creating project', chalk.cyan(process.cwd()), chalk.cyan(this.props.package), chalk.cyan(this.appname))
            cordova.create(process.cwd(), this.props.package, this.appname, done);
        } catch (err) {
            console.error('Failed to create cordova project', err);
            process.exit(1);
        }
    },
    app: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          appname: this.appname,
          name: this.user.git.name(),
          email: this.user.git.email()
        }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'), {
          appname: this.appname,
          name: this.user.git.name(),
          email: this.user.git.email()
        }
      );
    },
    gulp: function() {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'), {
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
        this.destinationPath('www'), {
          appname: this.appname,
          livereload: this.livereload
        }
      )
    },
    platforms: function() {
        if (this.props.platforms.length === 0) {
            return
        }
        var done = this.async()
        try {
            async.eachSeries(this.props.platforms, function(platform, cb) {
                console.log('Adding platform', chalk.cyan(platform))
                cordova.platform('add', platform, cb)
            }, done)
        } catch(err) {
            console.error('Failed to add platfoms', err)
            process.exit(1)
        }
    },
    plugins: function() {
        if (this.props.plugins.length === 0) {
            return
        }
        var done = this.async()
        try {
            async.eachSeries(this.props.plugins, function(plugin, cb) {
                console.log('Adding plugin', chalk.cyan(plugin))
                cordova.plugin('add', plugin, cb)
            }, done)
        } catch(err) {
            console.error('Failed to add plugins', err)
            process.exit(1)
        }
    },
    projectfiles: function() {
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

  install: function() {
    this.installDependencies();
  }
});
