var exec = require('child_process').exec;

var xdotool = function (query, callback) {
    exec('/usr/bin/xdotool search --class ' + query, function (err, stdout, stderr) {
        callback(stdout);
    });
};

module.exports = function (input, callback, xdotoolReplacement) {
    if (xdotoolReplacement) {
        xdotool = xdotoolReplacement;
    }

    xdotool(input, function (data) {
        data = data.split('\n');
        // Filter out empty values
        data = data.filter(function (item) {
            return item;
        });
        callback(data);
    });
};
