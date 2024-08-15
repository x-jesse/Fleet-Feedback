const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  tripId: {
    type: Number,
    index: true
  },
  incidentType: String,
  latitude: Number,
  longitude: Number,
  driverId: Number,
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
});

module.exports = mongoose.model('Incident', IncidentSchema);
