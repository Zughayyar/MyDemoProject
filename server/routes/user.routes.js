const UserController = require("../controllers/user.controllers");
const { authentication } = require('../config/jwt.config');

module.exports = (app) => {
    // Get All Users
    app.get('/api/users', authentication ,UserController.findAllUsers)

    // Get User by ID
    app.get('/api/users/:id', authentication ,UserController.findOneById)

    // Update User by ID
    app.patch('/api/users/:id', authentication ,UserController.updateUser)

    // Register User
    app.post('/api/users' ,UserController.registerUser)

    // Delete a User by ID
    app.delete('/api/users/:id', authentication ,UserController.deleteUser)

    // Login User
    app.post('/api/users/login' ,UserController.loginUser)

    // Logout User
    app.post('/api/users/logout' ,UserController.logoutUser)
}