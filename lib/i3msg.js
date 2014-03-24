var exec = require('child_process').exec;

function i3msg() {
    // expose the exec method such that it can be mocked in tests.
    this.execMethod = exec;
}

i3msg.prototype.exec = function (command, callback) {
    this.execMethod('/usr/bin/i3-msg -t ' + command, callback);
};


i3msg.prototype.getTree = function (cb) {
    this.exec('get_tree', function (err, stdout, stderr) {
        cb(JSON.parse(stdout));
    });
};

module.exports = i3msg;
