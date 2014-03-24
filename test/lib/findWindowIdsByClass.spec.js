/*global describe, it*/

var expect = require('unexpected');
var findWindowIdsByClass = require('../../lib/findWindowIdsByClass');

function xdotoolMock(data) {
    return function (input, callback) {
        return callback(data);
    }
}

describe('findWindowIdsByClass', function () {
    it('should return a list of window ids', function (done) {
        var mockData = '123\n231\n123';
        findWindowIdsByClass('someClass', function (windows) {
            expect(windows, 'to equal', ['123','231','123']);
            done();
        }, xdotoolMock(mockData));
    });
    it('should return an empty list of window ids when not matching', function (done) {
        var mockData = '\n';
        findWindowIdsByClass('someClass', function (windows) {
            expect(windows, 'to equal', []);
            done();
        }, xdotoolMock(mockData));
    });
});
