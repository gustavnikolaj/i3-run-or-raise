var expect = require('unexpected');
var Client = require('../../lib/Client');
var sampleTree = require('fs').readFileSync(require('path').resolve(__dirname, '../sampleData/twin_screen_tree.json'));

describe('Client', function () {
    var client = null;

    beforeEach(function () {
        client = new Client('echo');
    });

    describe('getWindows', function () {
        it('should return a list of windows when given a i3 tree', function (done) {
            client.exec = function (command, cb) {
                var err = null;
                var stderr = '';
                var stdout = sampleTree;

                return cb(err, stdout, stderr);
            };

            client.getWindows(function (err, windows) {
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
});