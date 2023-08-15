const express = require('express');
const router = express.Router();
const { addMember, removeMember } = require('../controllers/memberController');
const authenticateMiddleware = require('../middleware/authenticate'); // This middleware ensures that user is authenticated

router.post('/', authenticateMiddleware, addMember);
router.delete('/:id', authenticateMiddleware, removeMember);

module.exports = router;
