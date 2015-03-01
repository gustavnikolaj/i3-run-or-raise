/*global describe, it*/

var expect = require('unexpected');
var sampleTree = require('../sampleData/single_screen_tree.js');
var getWindows = require('../../lib/getWindows');

var i3msgReplacement = {
    getTree: function (cb) {
        cb(sampleTree);
    }
};

describe('getWindows', function () {
    it('should take a second argument to dependency overwrite.', function (done) {
        var isCalled = false,
            dependencyOverwrite = {
                getTree: function (callback) {
                    isCalled = true;
                    callback();
                }
            };

        getWindows(function () {
            expect(isCalled, 'to be ok');
            done();
        }, dependencyOverwrite);
    });
    it('should return a list of windows when given a i3 tree', function (done) {
        getWindows(function (windows) {
            expect(windows, 'to satisfy', [
                {
                    "focused": false,
                    "name": "emacs@workstation",
                    "window": 31457443
                },
                {
                    "focused": true,
                    "name": "Terminal",
                    "window": 29360269
                },
                {
                    "focused": false,
                    "name": "JSONLint - The JSON Validator - Google Chrome",
                    "window": 35651585
                },
                {
                    "focused": false,
                    "name": "i3bar for output DVI-I-1",
                    "window": 25165831
                }
            ]);
            done();
        }, i3msgReplacement);
    });
});
