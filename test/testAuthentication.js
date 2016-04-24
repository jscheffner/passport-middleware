"use strict";

var sinon = require('sinon');
var expect = require('chai').expect;
var ensureAuthentication = require('../').ensureAuthentication;

describe('Authentication', function () {

    it('should call next if req.isAuthenticated is true', function () {
        var req, res, next;
        req = {
            isAuthenticated: sinon.stub().returns(true)
        };
        res = {
            status: sinon.spy(),
            end: sinon.spy()
        };
        next = sinon.spy();
            
        ensureAuthentication(req, {}, next);
            expect(next.called).to.equal(true);
            expect(res.status.called).to.equal(false);
            expect(res.end.called).to.equal(false);
        });
        it('should call res.status(401).end() if req.isAuthenticated is false', function () {
            var req, res, next, statusSpy;
            req = {
                isAuthenticated: sinon.stub().returns(false)
            };
            res = {};
            res.status = function () {
                return this;
            };
            res.end = sinon.spy();
            statusSpy = sinon.spy(res, 'status');
            next = sinon.spy();
            ensureAuthentication(req, res, next);
            expect(next.called).to.equal(false);
            expect(statusSpy.calledWith(401)).to.equal(true);
            expect(res.end.called).to.equal(true);
        });    
});