/*global describe, it*/

var expect = require('unexpected');
var sampleTree = JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname, '../sampleData/twin_screen_tree.json')));
var getWindowsPath = '../../lib/getWindows';

var mocks = {
    './i3msg': {
        getTree: function (cb) {
            cb(sampleTree);
        }
    }
};

var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

describe('getWindows', function () {
    it('should return a list of windows when given a i3 tree', function (done) {
        var getWindows = proxyquire(getWindowsPath, mocks);
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
        });
    });
});
