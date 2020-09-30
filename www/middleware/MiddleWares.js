"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = exports.checkJwt = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../misc/config");
exports.checkJwt = (req, res, next) => {
    // Get the jwt token from the head
    const token = req.body.token || req.params.token || req.headers['x-access-token'];
    let jwtPayload;
    // Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config_1.default.secret);
        req.body.decoded = jwtPayload;
    }
    catch (error) {
        // If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({ success: false, message: 'Invalid token' });
        return;
    }
    next();
};
exports.hasRole = (roles) => {
    return (req, res, next) => {
        const user = req.body.decoded;
        if (!user || (roles.indexOf(user.role) === -1)) {
            return res.status(403).send({ success: false, message: 'Access denied' });
        }
        next();
    };
};
//# sourceMappingURL=MiddleWares.js.map