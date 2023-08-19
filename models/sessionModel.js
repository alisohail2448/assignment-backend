const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  dean: String,
  bookedByStudentId: [{
    type: String, 
  }],
  time: String,
  status: {
    type: String,
    enum: ['available', 'booked', 'completed'],
    default: 'available',
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
