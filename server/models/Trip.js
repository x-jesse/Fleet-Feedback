const mongoose = require('mongoose');

/*
Things to incl:

Aggregate data
- tripID
- duration
- av speed
- av mileage
- av idle time
- av fuel consumption
- collision count
- near miss count
- violation count
- lane drift count
- CSA score

Timeseries
- speed
- location
- 
*/

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
