const mongoose = require('mongoose');

const deanSchema = new mongoose.Schema({
  universityID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Dean = mongoose.model('Dean', deanSchema);

module.exports = Dean;
