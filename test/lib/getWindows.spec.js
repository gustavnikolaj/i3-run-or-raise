/*global describe, it*/

var expect = require('unexpected');
var sampleTree = JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname, '../sampleData/twin_screen_tree.json')));
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
                    name: 'Terminal',
                    id: 16741328,
                    focused: true,
                    window: 41943046,
                    className: 'Gnome-terminal'
                },
                {
                    name: 'some webpage - Google Chrome',
                    id: 16658352,
                    focused: false,
                    window: 35651585,
                    className: 'Google-chrome'
                },
                {
                    name: 'emacs@workstation',
                    id: 16557296,
                    focused: false,
                    window: 44040267,
                    className: 'Emacs24'
                }
            ]);
            done();
        }, i3msgReplacement);
    });
});
