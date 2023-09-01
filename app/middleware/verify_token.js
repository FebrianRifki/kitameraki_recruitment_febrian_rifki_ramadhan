const UserSession = require('../models/user_session');

async function verifyToken(req, res, next) {
    try {
        if (req.headers.token == "") {
            return res.status(401).send({
                status: "Unauthorized",
                message: "Token is missing",
                data: {}
            });
        }
        const token = req.headers.token;
        const userSession = await UserSession.findOne({ token: token });
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