const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.secret, (err, user) => {
            if(err) {
                return res.status(403).json({message: "Token not valid, Forbidden action!"})
            }

            req.user = user;
            next();
        })
    } else {
        res.status(401).json({message: 'Unauthorized'})
    }
}