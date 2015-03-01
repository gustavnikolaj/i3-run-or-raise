var _ = require('lodash');

module.exports = {
    byName: function (input, name) {
        var regex = new RegExp(name);
        return input.filter(function (item) {
            return item.name.match(regex);
        });
    },
    byClass: function (input, className) {
        return input.filter(function (window) {
            return window.className === className;
        });
    }
};
