const mongoose = require('mongoose');
const {Snowflake} = require('@theinternetfolks/snowflake');
const communitySchema = new mongoose.Schema({
    _id: { type: String, default: () => Snowflake.generate() },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    owner: { type: String, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});



module.exports = mongoose.model('Community', communitySchema);
