const Community = require('../models/Community');
const User = require('../models/User');
const Role = require('../models/Role');
const Member = require('../models/Member');

const addMember = async (req, res) => {
  try {
    const { community, user, role } = req.body;

    const requesterId = req.user.userId;
    const requesterMember = await Member.findOne({
      community,
      user: requesterId,
    }).populate('role');

    if (!requesterMember || !requesterMember.role) {
      return res.status(403).json({ error: 'NOT_ALLOWED_ACCESS' });
    }

    if (requesterMember.role.name !== 'Community Admin') {
      return res.status(403).json({ error: 'NOT_ALLOWED_ACCESS' });
    }

    const newMember = new Member({ community, user, role });
    await newMember.save();

    res.status(201).json({
      status: true,
      content: {
        data: {
          id: newMember._id,
          community: newMember.community,
          user: newMember.user,
          role: newMember.role,
          created_at: newMember.created_at,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await Member.findById(memberId).populate('role');

    if (!member || !member.role) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const requesterId = req.user.userId;
    const requesterMember = await Member.findOne({
      community: member.community,
      user: requesterId,
    }).populate('role');

    if (!requesterMember || !requesterMember.role) {
      return res.status(403).json({ error: 'NOT_ALLOWED_ACCESS' });
    }

    if (
      requesterMember.role.name !== 'Community Admin' &&
      requesterMember.role.name !== 'Community Moderator'
    ) {
      return res.status(403).json({ error: 'NOT_ALLOWED_ACCESS' });
    }

    await member.deleteOne();

    res.json({ status: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addMember,
  removeMember,
};
