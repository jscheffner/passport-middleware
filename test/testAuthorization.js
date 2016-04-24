var expect = require('chai').expect;
var sinon = require('sinon');
var ensureAuthorization = require('../').authorization(['admin', 'author']);

describe('authorization', function () {
    it('should call next if user has one of the accepted roles', function () {
        var req, res, next;

        req = { user : { roles : ['reader', 'author'] } }
        res = {
            status: sinon.spy(),
            end: sinon.spy()
        };
        next = sinon.spy();
        ensureAuthorization(req, res, next);
        expect(next.called).to.equal(true);
        expect(res.status.called).to.equal(false);
        expect(res.end.called).to.equal(false);
    });
    it('shoud call res.status(403).end() if user has none of the accepted roles', function() {
        var req, res, next, statusSpy;
        
        req = { user : { roles : ['reader', 'somestrangerole'] } }
        res = {};
        res.status = function () {
            return this;
        };
        res.end = sinon.spy();
        statusSpy = sinon.spy(res, 'status');
        next = sinon.spy();
        ensureAuthorization(req, res, next);
        expect(next.called).to.equal(false);
        expect(statusSpy.calledWith(403)).to.equal(true);
        expect(res.end.called).to.equal(true);
    });
})