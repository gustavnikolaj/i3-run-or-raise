var _ = require('lodash');

module.exports = {
    byName: function (input, name) {
        var regex = new RegExp(name);
        return input.filter(function (item) {
            return item.name.match(regex);
        });
    },
    byWindowId: function (input, query) {
        if (Array.isArray(query)) {
            var result = [];
            query.forEach(function (id) {
                var match = _.find(input, function (item) {
                    return item.window == id;
                });
                if (match) {
                    result.push(match);
                }
            });
            return result;
        } else {
            return input.filter(function (item) {
                return item.window == query;
            });
        }
    }
};
