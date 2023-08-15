const mongoose = require('mongoose');
const {Snowflake} = require('@theinternetfolks/snowflake');

const userSchema = new mongoose.Schema({
    _id: { type: String, default: () => Snowflake.generate() },
    name: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});



module.exports = mongoose.model('User', userSchema);;
