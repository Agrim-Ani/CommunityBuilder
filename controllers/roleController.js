const Role = require('../models/Role');

const createRole = async (req, res) => {
    try {
    const { name } = req.body;
    const role = new Role({ name });
    await role.save();

    res.status(201).json({
        status: true,
        content: {
        data: role,
        },
    });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

const getAllRoles = async (req, res) => {
    try {
    const roles = await Role.find();
    const meta = {
        total: roles.length,
        pages: 1,
        page: 1,
    };

    res.json({
        status: true,
        content: {
        meta,
        data: roles,
        },
    });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRole,
    getAllRoles,
};
