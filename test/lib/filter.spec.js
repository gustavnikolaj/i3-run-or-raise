/*global describe, it*/

var expect = require('unexpected');
var filter = require('../../lib/filter');

describe('filter', function () {
    describe('by name', function () {
        it('should filter a list of objects by name', function () {
            var inputData = [
                {name: "foo"},
                {name: "bar"},
                {name: "baz"}
            ];

            expect(filter.byName(inputData, 'qux').length, 'to be', 0);
            expect(filter.byName(inputData, 'baz').length, 'to be', 1);
        });
        it('should return multiple matches', function () {
            var inputData = [
                {name: "foo"},
                {name: "bar"},
                {name: "bar"}
            ];

            expect(filter.byName(inputData, 'bar').length, 'to be', 2);
        });
        it('should match when given a regex.', function () {
            var inputData = [
                {name: "foo"},
                {name: "bar"},
                {name: "baz"}
            ];

            expect(filter.byName(inputData, 'ba(z|r)').length, 'to be', 2);
        });
    });
    describe('by window id', function () {
        it('should filter a list of objects by window id', function () {
            var inputData = [
                {window: '123'},
                {window: '231'},
                {window: '321'}
            ];

            expect(filter.byWindowId(inputData, '333').length, 'to be', 0);
            expect(filter.byWindowId(inputData, '123').length, 'to be', 1);
        });
        it('should filter a list of objects by a list of window ids', function () {
            var inputData = [
                {window: '123'},
                {window: '231'},
                {window: '321'}
            ];

            expect(filter.byWindowId(inputData, ['333']).length, 'to be', 0);
            expect(filter.byWindowId(inputData, ['123']).length, 'to be', 1);
            expect(filter.byWindowId(inputData, ['123', '231']).length, 'to be', 2);
            expect(filter.byWindowId(inputData, ['123', '231', '333']).length, 'to be', 2);
        });
        it('should handle stringified window ids', function () {
            var inputData = [
                {window: 123},
                {window: 231},
                {window: 321}
            ];

            expect(filter.byWindowId(inputData, '123').length, 'to be', 1);
            expect(filter.byWindowId(inputData, ['123']).length, 'to be', 1);
        });
    });
});
