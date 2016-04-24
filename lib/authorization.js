var _ = require('underscore');

module.exports = function (roles) {
    return function (req, res, next) {
        var roleIntersection = _.intersection(roles, req.user.roles);
        if (roleIntersection.length > 0) {
            next();
        } else {
            res.status(403).end();
        }
    }
}