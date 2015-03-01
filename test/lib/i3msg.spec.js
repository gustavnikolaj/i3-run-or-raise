/* global describe, it */

var expect = require('unexpected');
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var i3msgPath = '../../lib/i3msg';

describe('i3msg', function () {
    describe('getTree', function () {
        it('should execute the get_tree command', function (done) {
            var i3msg = proxyquire(i3msgPath, {
                'child_process': {
                    exec: function (command) {
                        expect(command, 'to match', /get_tree$/);
                        done();
                    }
                }
            });
            i3msg.getTree();
        });
        it('should pass a javascript object to its callback', function (done) {
            var i3msg = proxyquire(i3msgPath, {
                'child_process': {
                    exec: function (command, callback) {
                        return callback(null, '{"foo": "bar"}');
                    }
                }
            });
            i3msg.getTree(function (tree) {
                expect(tree, 'to equal', {
                    foo: 'bar'
                });
                done();
            });
        });
    });
});
