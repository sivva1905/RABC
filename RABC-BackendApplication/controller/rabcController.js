const userService = require('../service/rabcService');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user
    const token = await userService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Call service method to fetch users
    res.status(200).json({
      success: true,
      message: 'Fetched all users successfully',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete user by email
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body; // Get email from request body
    const deletedUser = await userService.deleteUserByEmail(email);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user by email
const updateUser = async (req, res) => {
  try {
    const { email, ...updateFields } = req.body; // Destructure to separate email and update fields
    const updatedUser = await userService.updateUserByEmail(email, updateFields);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser, getAllUsers,updateUser,deleteUser };
