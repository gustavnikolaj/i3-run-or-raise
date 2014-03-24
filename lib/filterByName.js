module.exports = function (input, name) {
    var regex = new RegExp(name);
    return input.filter(function (item) {
        return item.name.match(regex);
    });
};
