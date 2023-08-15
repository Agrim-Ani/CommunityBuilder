const Community = require('../models/Community');
const User = require('../models/User');
const Role = require('../models/Role');
const Member = require('../models/Member');

const createCommunity = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-'); // Generate slug
    const owner = req.user.userId; // Get the owner's ID from the authenticated user

    const community = new Community({ name, slug, owner });
    await community.save();

    const ownerRole = await Role.findOne({ name: 'Community Admin' }); // Find the Community Admin role

    const member = new Member({ community: community._id, user: owner, role: ownerRole._id });
    await member.save();

    res.status(201).json({
      status: true,
      content: {
        data: {
          id: community._id,
          name: community.name,
          slug: community.slug,
          owner: community.owner,
          created_at: community.created_at,
          updated_at: community.updated_at
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().populate('owner', 'id name');

    res.json({
      status: true,
      content: {
        meta: {
          total: communities.length,
          pages: 1,
          page: 1,
        },
        data: communities,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const communityId = req.params.id;
    const members = await Member.find({ community: communityId })
      .populate('user', 'id name')
      .populate('role', 'id name');

    res.json({
      status: true,
      content: {
        meta: {
          total: members.length,
          pages: 1,
          page: 1,
        },
        data: members,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyOwnedCommunity = async (req, res) => {
  try {
    const communities = await Community.find({ owner: req.user.userId });

    res.json({
      status: true,
      content: {
        meta: {
          total: communities.length,
          pages: 1,
          page: 1,
        },
        data: communities,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyJoinedCommunity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const members = await Member.find({ user: userId }).populate({
      path: 'community',
      populate: {
        path: 'owner',
        select: 'id name',
      },
    });

    const communities = members.map(member => member.community);

    res.json({
      status: true,
      content: {
        meta: {
          total: communities.length,
          pages: 1,
          page: 1,
        },
        data: communities,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCommunity,
  getAllCommunities,
  getAllMembers,
  getMyOwnedCommunity,
  getMyJoinedCommunity,
};
