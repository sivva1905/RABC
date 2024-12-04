const express = require('express');
const { registerUser, loginUser, getAllUsers,deleteUser,updateUser } = require('../controller/rabcController');

const router = express.Router();

// Route for registration
router.post('/register', registerUser);

// Route for login
router.post('/login', loginUser);

// Route to get all users
router.get('/users', getAllUsers);
// Route to delete a user by email
router.post('/users/delete', deleteUser);

// Route to update a user by email
router.post('/users/update', updateUser);
module.exports = router;
