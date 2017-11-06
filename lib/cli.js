var _ = require('lodash');

module.exports = function (argv, client) {
    client.getWindows(function (err, windows) {
        if (err) {
            throw err;
        }

        if (argv.n) {
            var regex = new RegExp(argv.n);
            windows = windows.filter(function (item) {
                return item.name.match(regex);
            });
        }
        if (argv.c) {
            windows = windows.filter(function (window) {
                return window.className === argv.c;
            });
        }
        if (windows.length) {
            // find next unfocused in the matching set.
            var focused = _.find(windows, function (item) {
                return item.focused;
            });
            var indexOfFocused = windows.indexOf(focused);
            var indexOfNext;

            if (indexOfFocused !== -1) {
                if (windows.length === 1) {
                    indexOfNext = 0;
                } else {
                    indexOfNext = (indexOfFocused === windows.length - 1) ? 0 : indexOfFocused + 1;
                }
            } else {
                indexOfNext = 0;
            }

            client.focus(windows[indexOfNext].id);
        } else {
            if (argv._) {
                client.run(argv.w, argv._.join(' '));
            }
        }
    });
};