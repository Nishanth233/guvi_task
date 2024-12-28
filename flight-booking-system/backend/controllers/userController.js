const User = require('../models/user');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error registering user:', error); // Log the error for more details
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error); // Log the error for more details
    res.status(500).json({ error: 'Failed to login user' });
  }
};

