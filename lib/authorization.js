const _ = require('underscore');

module.exports = roles => (req, res, next) => {
    const roleIntersection = _.intersection(roles, req.user.roles);
    if (roleIntersection.length > 0) {
        next();
    } else {
        res.sendStatus(403).end();
    }
};
