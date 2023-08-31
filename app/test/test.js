const TaskController = require('../controllers/task_controller');
const Task = require("../models/task");

jest.mock("../models/task")

describe('Task Controller', () => {
    describe('createTask', () => {
        it('should create and save data in database', async () => {
            const mockRequest = {
                body: {
                    id: '1',
                    title: 'Sample Task',
                    status: 'todo'
                }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            Task.create.mockResolvedValue(mockRequest.body);

            await TaskController.createTask(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: 'Success',
                message: 'Success',
                data: mockRequest.body
            });
        });

        it('should handle bad request', async () => {
            const mockRequest = {
                body: {
                    id: '',
                    title: '',
                    status: '',
                }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }
            await TaskController.createTask(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: 'Bad Request',
                message: 'Id is required',
                data: {}
            });
        })

        it('should handle error and return 500 status', async () => {
            const mockRequest = {
                body: {
                    id: '1',
                    title: 'Sample Task',
                    status: 'To do'
                }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }
            Task.create.mockRejectedValue(new Error('Internal Server Error!'));

            await TaskController.createTask(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: 'Failed',
                message: 'Internal Server Error!',
                data: {}
            });
        });
    });

    describe('getAllTask', () => {
        it('should display all data', async () => {
            const fetchDataResponse = [
                {
                    "_id": "64efe60560abf389e8f34b01",
                    "id": "1",
                    "title": "Sample Task",
                    "description": "This is a sample task",
                    "dueDate": "2023-08-30T10:00:00.000Z",
                    "priority": "medium",
                    "status": "todo",
                    "tags": [
                        "sample"
                    ],
                    "__v": 0
                },
                {
                    "_id": "64efec48fc960828de9f0292",
                    "id": "2",
                    "title": "title 2",
                    "description": "Updated task description",
                    "dueDate": "2023-08-30T10:00:00.000Z",
                    "priority": "medium",
                    "status": "cancelled",
                    "tags": [
                        "sample update 2"
                    ],
                    "__v": 0
                }
            ];

            const mockRequest = {
                query: {
                    page: '1', limit: '10'
                }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            Task.find = jest.fn(() => ({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(fetchDataResponse)
            }));

            await TaskController.getAllTask(mockRequest, mockResponse);

            expect(Task.find).toHaveBeenCalledWith();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: "Success",
                message: "Success",
                data: fetchDataResponse
            })
        })

        it('should handle error and return 500 status', async () => {
            const mockRequest = {
                query: {
                    page: '1',
                    limit: '10'
                }
            }
            const mockError = new Error('Internal Server Error!');
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }
            Task.find = jest.fn(() => ({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockRejectedValue(mockError)
            }));

            await TaskController.getAllTask(mockRequest, mockResponse);

            expect(Task.find).toHaveBeenCalledWith();
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: "Failed",
                message: "Internal Server Error!",
                data: {}
            })
        });
    })

    describe('findOneData', () => {
        it('should return the data based on parameter id', async () => {
            const fetchDataResponse =
            {
                "_id": "64efe60560abf389e8f34b01",
                "id": "1",
                "title": "Sample Task",
                "description": "This is a sample task",
                "dueDate": "2023-08-30T10:00:00.000Z",
                "priority": "medium",
                "status": "todo",
                "tags": [
                    "sample"
                ],
                "__v": 0
            };

            const mockRequest = {
                params: {
                    id: "1",
                }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            Task.findOne = jest.fn().mockResolvedValue(fetchDataResponse);
            await TaskController.findOneData(mockRequest, mockResponse);

            expect(Task.findOne).toHaveBeenCalledWith({ id: mockRequest.params.id });
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: "Success",
                message: "Success",
                data: fetchDataResponse
            });
        });

        it('should handle error and return 500 status', async () => {
            const mockRequest = {
                params: {
                    id: "1",
                }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const mockError = new Error("Internal Server Error!");

            Task.findOne = jest.fn().mockRejectedValue(mockError);
            await TaskController.findOneData(mockRequest, mockResponse);

            expect(Task.findOne).toHaveBeenCalledWith({ id: mockRequest.params.id });
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: "Failed",
                message: "Internal Server Error!",
                data: {}
            })
        });
    });

    describe('updateTask', () => {
        it('should update task data', async () => {
            const taskId = "1";
            const updateData = {
                title: "Updated Title",
                status: "done"
            };
            const mockRequest = {
                params: {
                    id: taskId,
                },
                body: updateData
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const mockUpdateResult = {
                nModified: 1
            };
            Task.find = jest.fn().mockResolvedValue([{ id: taskId }]);
            Task.updateMany = jest.fn().mockResolvedValue(mockUpdateResult);

            await TaskController.updateTask(mockRequest, mockResponse);

            expect(Task.find).toHaveBeenCalledWith({ id: taskId });
            expect(Task.updateMany).toHaveBeenCalledWith({ id: taskId }, updateData);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: "Success",
                message: "Success",
                data: {}
            })
        });

        it('should handle task not found', async () => {
            const taskId = "1";
            const updateData = {
                title: "Updated Title",
                status: "done"
            };
            const mockRequest = {
                params: {
                    id: taskId
                },
                body: {
                    updateData
                }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            Task.find = jest.fn().mockResolvedValue([]);

            await TaskController.updateTask(mockRequest, mockResponse);
            expect(Task.find).toHaveBeenCalledWith({ id: taskId });
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: "Not Found",
                message: `Task with ID ${taskId} Not Found`,
                data: {}
            })
        });

        it('should handle error and return 500 status', async () => {
            const taskId = "1";
            const updateData = {
                title: "Updated Title",
                status: "done"
            };
            const mockRequest = {
                params: {
                    id: taskId
                },
                body: updateData
            };
            const mockError = new Error("Internal Server Error!");
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            Task.find = jest.fn().mockRejectedValue(mockError);
            await TaskController.updateTask(mockRequest, mockResponse);
            expect(Task.find).toHaveBeenCalledWith({ id: taskId });
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: "Failed",
                message: "Internal Server Error!",
                data: {}
            })
        });
    });
    describe('deleteTask', () => {
        it('should delete task data', async () => {
            const mockData = {
                "status": "Success",
                "message": `Success delete Task`,
                "data": {}
            }
            const mockRequest = {
                params: {
                    id: "1"
                }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            Task.findOneAndDelete = jest.fn().mockResolvedValue(mockData);
            await TaskController.deleteTask(mockRequest, mockResponse);

            expect(Task.findOneAndDelete).toHaveBeenCalledWith({ id: mockRequest.params.id });
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: "Success",
                message: "Success delete Task",
                data: {}
            });
        })
        it('should return task not found', async () => {
            const taskId = "1";
            const mockRequest = {
                params: {
                    id: taskId
                }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            Task.findOneAndDelete = jest.fn().mockResolvedValue(null);
            await TaskController.deleteTask(mockRequest, mockResponse);
            expect(Task.findOneAndDelete).toHaveBeenCalledWith({ id: mockRequest.params.id });
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: "Not Found",
                message: `Task with ID ${taskId} Not Found`,
                data: {}
            });
        });
        it('should handle error and return 500 status', async () => {
            const taskId = "1";
            const mockRequest = {
                params: {
                    id: taskId
                }
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const mockError = new Error("Internal Server Error!");
            Task.findOneAndDelete = jest.fn().mockRejectedValue(mockError);
            await TaskController.deleteTask(mockRequest, mockResponse);
            expect(Task.findOneAndDelete).toHaveBeenCalledWith({ id: mockRequest.params.id });
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.send).toHaveBeenCalledWith({
                status: "Failed",
                message: "Internal Server Error!",
                data: {}
            })
        });
    });
});