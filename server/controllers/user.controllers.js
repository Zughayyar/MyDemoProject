const { User } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JWT Token Generator
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

module.exports = {
    // Register User
    registerUser: async (request, response) => {
        try {
            const { email } = request.body;
            console.log(request.body);
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return response.status(400).json({ message: 'User already exists' });
            }
        
            const user = await User.create(request.body);
            const token = generateToken(user);
            
            return response.status(201).json({ message: 'User registered', user, token });
        } catch (err) {
            return response.status(400).json(err);
        }
    },

    // Login User
    loginUser: async (request, response) => {
        try {
            const { email, password } = request.body;
            const user = await User.findOne({ email });

            if (!user) {
                return response.status(400).json({ message: 'User does not exist' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return response.status(400).json({ message: 'Password is incorrect' });
            }

            const token = generateToken(user);
            response
                .cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' })
                .status(200)
                .json({ message: 'Login successful', user, token });
        } catch (err) {
            return response.status(500).json({ message: 'Server error', error: err });
        }
    },

    // Logout user
    logoutUser: (request, response) => {
        response.clearCookie('token');
        response.sendStatus(200);
    },

    // Get all Users
    findAllUsers: async (request, response) => {
        try {
            const users = await User.find();
            response.status(200).json(users);
        } catch (err) {
            response.status(400).json(err);
        }
    },

    // Get User by ID
    findOneById: async (request, response) => {
        try {
            const user = await User.findById(request.params.id);
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }
            response.status(200).json(user);
        } catch (err) {
            response.status(404).json(err);
        }
    },

    // Update a User
    updateUser: async (request, response) => {
        try {
            let data = request.body;
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }

            const user = await User.findOneAndUpdate(
                { _id: request.params.id },
                data,
                { new: true, runValidators: true }
            );

            if (!user) return response.status(404).json({ message: 'User not found' });

            response.status(200).json(user);
        } catch (err) {
            response.status(404).json(err);
        }
    },

    // Delete a User
    deleteUser: async (request, response) => {
        try {
            const result = await User.deleteOne({ _id: request.params.id });
            response.status(200).json({ message: 'User deleted', result });
        } catch (err) {
            response.status(404).json(err);
        }
    }
};