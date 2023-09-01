const userRoute = require('express').Router();
const { user } = require('../controllers');

userRoute.post('/user/register', user.register);
userRoute.post('/user/login', user.login);
userRoute.get('/user/logout', user.logout);


/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - User
 *     requestBody:
 *       description: Data for creating a new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: username
 *               email: test@testmail.com
 *               password: rahasia123
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad Request
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal Server Error!
 */
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authenticate and get an access token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: test@testmail.com
 *               password: rahasia123
 *     responses:
 *       '200':
 *         description: Success
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error!
 */
/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Authenticate and get an access token
 *     tags:
 *       - User
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *     responses:
 *       '200':
 *         description: Created
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error! 
 *     security:
 *       - bearerAuth: [] 
 */
module.exports = userRoute;