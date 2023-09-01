const User = require('../models/user');
const UserSession = require('../models/user_session');
const { secretKey } = require('../config/config');
const jwt = require('jsonwebtoken');



exports.register = async (req, res) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).send({
                status: "Bad Request",
                message: "Username, email, and password are required",
                data: {}
            });
        }
        const exisitingUser = await User.findOne({ email: req.body.email })
        if (exisitingUser) {
            return res.status(409).send({
                status: "Conflict",
                message: "User with this email already exist",
                data: {}
            });
        }
        const userData = req.body;
        createdUser = await User.create(userData);
        return res.status(201).send({
            status: "Success",
            message: "Success",
            data: createdUser
        });

    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Internal Server Error!",
            data: {}
        });
    }
}

exports.login = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(404).send({
                status: "Not Found",
                message: "User with this email not found",
                data: {}
            });
        }
        const isPasswordValid = await existingUser.comparePassword(req.body.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                status: "Unauthorized",
                message: "Invalid password",
                data: {}
            });
        }

        const token = jwt.sign({ userId: existingUser._id }, secretKey, { expiresIn: '1h' });
        await UserSession.create({
            token: token,
            createdAt: new Date(),
        });
        return res.status(200).json({
            status: "Success",
            message: "Login successful",
            access_token: token,
            token_type: "bearer",
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: "Internal Server Error",
            data: {}
        });
    }
};

exports.logout = async (req, res) => {
    const bearerAuth = req.headers.bearerAuth;
    try {
        const deletedSession = await UserSession.findOneAndDelete({ token: bearerAuth });

        if (!deletedSession) {
            return res.status(401).json({
                status: "Unauthorized",
                message: "Invalid or expired token. You are not logged in.",
                data: {}
            });
        }
        res.status(200).json({
            status: "Success",
            message: "You have been successfully logged out",
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Internal Server Error",
            data: {}
        });
    }

}

