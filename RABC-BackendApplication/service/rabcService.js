const User = require('../model/rabcModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt

const registerUser = async (userData) => {
  const { email } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create a new user
  const user = new User(userData);
  await user.save();
  return user;
};

const loginUser = async (email, password) => {
  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the password
  const isPasswordMatch = await bcrypt.compare(password, user.password);  // bcrypt is now defined
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    'your_jwt_secret', // Replace with a secure secret key
    { expiresIn: '1h' }
  );

  return {
    token,
    email: user.email,
    role: user.role, // Assuming the User model includes a 'role' field
  };
};

// New method to get all users
const getAllUsers = async () => {
  try {
    const users = await User.find({}, '-password'); // Exclude the password field
    return users;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};
// Delete user by email
const deleteUserByEmail = async (email) => {
  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update user by email
const updateUserByEmail = async (email, updateFields) => {
  try {
    // Check if password is being updated and hash it
    if (updateFields.password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(updateFields.password, salt);
    }

    // Perform the update
    const updatedUser = await User.findOneAndUpdate({ email }, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
      context: 'query', // Required for validators in some cases
    });

    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerUser, loginUser, getAllUsers,updateUserByEmail,deleteUserByEmail };
