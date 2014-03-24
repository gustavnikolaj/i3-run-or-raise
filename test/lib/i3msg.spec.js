/* global describe, it */

var expect = require('unexpected');
var i3msg = require('../../lib/i3msg');

describe('i3msg', function () {
    var msg;
    beforeEach(function () {
        msg = new i3msg();
    });
    it('should have an overwriteable execMethod reference', function () {
        expect(msg.exec, 'to be a function');
    });
    describe('getTree', function () {
        it('should execute the get_tree command', function (done) {
            msg.exec = function (command, callback) {
                expect(command, 'to be', 'get_tree');
                done();
            };
            msg.getTree();
        });
        it('should pass a javascript object to its callback', function (done) {
            var obj = {foo: 'bar'};

            msg.exec = function (command, callback) {
                callback(null, JSON.stringify(obj));
            };

            msg.getTree(function (tree) {
                expect(tree, 'to equal', obj);
                done();
            });
        });
    });
});
