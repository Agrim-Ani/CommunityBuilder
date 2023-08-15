const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY);

        res.status(201).json({
        status: true,
        content: {
            data: {
            id: user._id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            },
            meta: {
            access_token: accessToken,
            },
        },
        });
    } catch (error) {
        console.log("1")
        res.status(500).json({ error: error.message });
    }
};

const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY);

        res.json({
        status: true,
        content: {
            data: {
            id: user._id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            },
            meta: {
            access_token: accessToken,
            },
        },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');

        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        res.json({
        status: true,
        content: {
            data: user,
        },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    userSignup,
    userSignIn,
    getMe,
};
