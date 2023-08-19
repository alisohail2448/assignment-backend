const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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

const User = mongoose.model('Student', studentSchema);

module.exports = User;
