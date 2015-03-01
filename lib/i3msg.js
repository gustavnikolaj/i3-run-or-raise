var exec = require('child_process').exec;

module.exports = {
    getTree: function (cb) {
        exec('/usr/bin/i3-msg -t get_tree', function (err, stdout, stderr) {
            cb(JSON.parse(stdout));
        });
    }
};
