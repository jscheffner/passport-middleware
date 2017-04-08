"use strict";

const sinon = require('sinon');
const expect = require('chai').expect;
const ensureAuthentication = require('../').ensureAuthentication;

describe('Authentication', function () {

    it('should call next if req.isAuthenticated is true', function () {
        const req = {
            isAuthenticated: sinon.stub().returns(true)
        };
        const res = {
            status: sinon.spy(),
            end: sinon.spy()
        };
        const next = sinon.spy();
            
        ensureAuthentication(req, {}, next);
        expect(next.called).to.equal(true);
        expect(res.status.called).to.equal(false);
        expect(res.end.called).to.equal(false);
    });
    it('should call res.sendStatus(401).end() if req.isAuthenticated is false', function () {
        const req = {
             isAuthenticated: sinon.stub().returns(false)
        };
        const res = {
            sendStatus: () => res,
            end: sinon.spy()
        };
        const statusSpy = sinon.spy(res, 'sendStatus');
        const next = sinon.spy();
        ensureAuthentication(req, res, next);
        expect(next.called).to.equal(false);
        expect(statusSpy.calledWith(401)).to.equal(true);
        expect(res.end.called).to.equal(true);
    });        
});