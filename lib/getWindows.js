var i3msg = require('./i3msg'),
    i3 = new i3msg();

function walkTree(tree, windows) {
    if (tree.window) {
        windows.push({
            name: tree.name,
            id: tree.id,
            focused: tree.focused,
            window: tree.window
        });
    }
    if (tree.nodes) {
        tree.nodes.forEach(function (subTree) {
            walkTree(subTree, windows);
        });
    }
}

function getWindows(callback, i3msgReplacement) {
    // The second argument is in place to allow the test to mock the
    // i3msg library.
    if (i3msgReplacement) {
        i3 = i3msgReplacement;
    }

    i3.getTree(function (tree) {
        var windows = [];
        if (tree) {
            walkTree(tree, windows);
        }

        callback(windows);
    });
}

module.exports = getWindows;
