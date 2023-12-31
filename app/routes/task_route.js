const taskRoute = require('express').Router();
const { task } = require('../controllers')

taskRoute.post('/task', task.createTask);
taskRoute.get('/task', task.getAllTask);
taskRoute.get('/task/:id', task.findOneData);
taskRoute.patch('/task/:id', task.updateTask);
taskRoute.delete('/task/:id', task.deleteTask);


/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       description: Data for creating a new task
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate: 
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               tags: 
 *                 type: array
 *             example:
 *               id: 1
 *               title: New Task
 *               description: This is a new task.
 *               dueDate: 2023-08-30T10:00:00Z
 *               priority: medium
 *               status: todo
 *               tags: ["sample"]
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error!
 */

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Fetch all task
 *     tags:
 *        - Tasks
 *     responses:
 *       '200':
 *            description: Success
 *       '500':
 *            description: Internal Server Error!
 */

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Fetch task by ID
 *     tags:
 *        - Tasks
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: ID of the task to fetch
 *     responses:
 *       '200':
 *            description: Success
 *       '404':
 *            description: Task not found
 *       '500':
 *            description: Internal Server Error!
 */

/**
 * @swagger
* /task:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       description: Data for creating a new task
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate: 
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               tags: 
 *                 type: array
 *             example:
 *               id: 1
 *               title: New Task
 *               description: This is a new task.
 *               dueDate: 2023-08-30T10:00:00Z
 *               priority: medium
 *               status: todo
 *               tags: ["sample"]
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error!
 */

/**
 * @swagger
 * /task/{id}:
 *   patch:
 *     summary: Update task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the task to update
 *     requestBody:
 *       description: Updated data for the task
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate: 
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               tags: 
 *                 type: array
 *             example:
 *               title: Updated Task
 *               description: This is an updated task.
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     tags:
 *        - Tasks
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: ID of the task to delete
 *     responses:
 *       '200':
 *            description: Success
 *       '404':
 *            description: Task not found
 *       '500':
 *            description: Internal Server Error!
 */

module.exports = taskRoute;