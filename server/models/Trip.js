const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TripSchema = new mongoose.Schema({
  tripId: {
    type: Number,
    index: true,
    unique: true,
  },
  duration: Number,
  locations: [],
  offences: {
    tailgates: {
      count: Number,
      occurences: {
        type: Map
      },
      locations: [Tuple],
      videos: [Buffer]
    },
    collisions: {
      count: Number,
      locations: [Number]
    }
  }
});

module.exports = mongoose.model('Trip', UserSchema);
