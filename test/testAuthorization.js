const expect = require('chai').expect;
const sinon = require('sinon');
const ensureAuthorization = require('../').authorization(['admin', 'author']);

describe('authorization', function () {
    it('should call next if user has one of the accepted roles', function () {
        const req = { user : { roles : ['reader', 'author'] } };
        const res = {
            status: sinon.spy(),
            end: sinon.spy()
        };
        const next = sinon.spy();
        ensureAuthorization(req, res, next);
        expect(next.called).to.equal(true);
        expect(res.status.called).to.equal(false);
        expect(res.end.called).to.equal(false);
    });
    it('should call res.sendStatus(403).end() if user has none of the accepted roles', function() {
        const req = { user : { roles : ['reader', 'somestrangerole'] } };
        const res = {};
        res.sendStatus = function () {
            return this;
        };
        res.end = sinon.spy();
        const statusSpy = sinon.spy(res, 'sendStatus');
        const next = sinon.spy();
        ensureAuthorization(req, res, next);
        expect(next.called).to.equal(false);
        expect(statusSpy.calledWith(403)).to.equal(true);
        expect(res.end.called).to.equal(true);
    });
});