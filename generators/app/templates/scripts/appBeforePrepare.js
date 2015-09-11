var exec = require('child_process').exec

module.exports = function(context) {
    var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();
    exec('gulp build', deferral.resolve)
    return deferral.promise
}
