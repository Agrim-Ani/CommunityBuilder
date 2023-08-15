const express = require('express');
const router = express.Router();
const { createCommunity, getAllCommunities, getAllMembers, getMyOwnedCommunity, getMyJoinedCommunity } = require('../controllers/communityController');
const authenticateMiddleware = require('../middleware/authenticate'); // This middleware ensures that user is authenticated

router.post('/', authenticateMiddleware, createCommunity);
router.get('/', getAllCommunities);
router.get('/:id/members', getAllMembers);
router.get('/me/owner', authenticateMiddleware, getMyOwnedCommunity);
router.get('/me/member', authenticateMiddleware, getMyJoinedCommunity);

module.exports = router;
