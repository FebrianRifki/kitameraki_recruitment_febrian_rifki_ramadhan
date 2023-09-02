const UserSession = require('../models/user_session');

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.hasOwnProperty('authorization')) {
            return res.status(401).send({
                status: "Unauthorized",
                message: "Token is missing",
                data: {}
            });
        }
        const splitedHeaders = req.headers.authorization.split(/(\s+)/);
        const bearerAuth = splitedHeaders[2];
        const userSession = await UserSession.findOne({ token: bearerAuth });
        if (!userSession) {
            return res.status(401).send({
                status: "Unauthorized",
                message: "Invalid Token",
                data: {}
            });
        }
        next();
    } catch (error) {
        res.status(500).send({
            status: "Internal Server Error!",
            message: "Database error",
            data: {}
        });
    }
}

module.exports = verifyToken;