const express = require('express');
const router = express.Router();
const { userSignup, userSignIn, getMe } = require('../controllers/userController');
const authenticateMiddleware = require('../middleware/authenticate'); // This middleware ensures that user is authenticated

router.post('/signup', userSignup);
router.post('/signin', userSignIn);
router.get('/me', authenticateMiddleware, getMe); // Protect this route with authentication middleware

module.exports = router;
