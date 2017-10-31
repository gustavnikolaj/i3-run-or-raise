var exec = require('child_process').exec;

function Client(binary) {
    this.binary = binary;
}

Client.prototype.exec = function (args, callback) {
    return exec(this.binary + ' ' + args, callback);
};

Client.prototype.getWindows = function (callback) {
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

    this.exec('-t get_tree', function (err, stdout, stderr) {
        if (err) {
            return callback(err);
        }

        var tree;
        try {
            tree = JSON.parse(stdout);
        } catch (err) {
            return callback(err);
        }

        var windows = [];
        if (tree) {
            walkTree(tree, windows);
        }

        // remove i3bars from output
        windows = windows.filter(function (window) {
            return window.className !== 'i3bar';
        });

        callback(null, windows);
    });
};

Client.prototype.focus = function (conId, callback) {
    return this.exec('[con_id=' + conId + '] focus', callback);
};

Client.prototype.run = function (workspace, args, callback) {
    var ws = '';
    if (workspace) { ws = 'workspace ' + workspace + '; ' }

    return this.exec("'" + ws + 'exec --no-startup-id ' + args + "'", callback);
}

module.exports = Client;