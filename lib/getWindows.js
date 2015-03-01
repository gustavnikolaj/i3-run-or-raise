var i3msg = require('./i3msg');

function walkTree(tree, windows) {
    if (tree.window) {
        windows.push({
            name: tree.name,
            id: tree.id,
            focused: tree.focused,
            window: tree.window,
            className: tree['window_properties']['class']
        });
    }
    if (tree.nodes) {
        tree.nodes.forEach(function (subTree) {
            walkTree(subTree, windows);
        });
    }
}

function getWindows(callback) {
    i3msg.getTree(function (tree) {
        var windows = [];
        if (tree) {
            walkTree(tree, windows);
        }

        // remove i3bars from output
        windows = windows.filter(function (window) {
            return window.className !== 'i3bar';
        });

        callback(windows);
    });
}

module.exports = getWindows;
