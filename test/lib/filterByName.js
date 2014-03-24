/*global describe, it*/

var expect = require('unexpected');
var filterByName = require('../../lib/filterByName');

describe('filterByName', function () {
    it('should filter a list of objects by name', function () {
        var inputData = [
            {name: "foo"},
            {name: "bar"},
            {name: "baz"}
        ];

        expect(filterByName(inputData, 'qux').length, 'to be', 0);
        expect(filterByName(inputData, 'baz').length, 'to be', 1);
    });
    it('should return multiple matches', function () {
        var inputData = [
            {name: "foo"},
            {name: "bar"},
            {name: "bar"}
        ];

        expect(filterByName(inputData, 'bar').length, 'to be', 2);
    });
    it('should match when given a regex.', function () {
        var inputData = [
            {name: "foo"},
            {name: "bar"},
            {name: "baz"}
        ];

        expect(filterByName(inputData, 'ba(z|r)').length, 'to be', 2);
    });
});
