const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "driver",
    required: false
  },
  driverId: {
    type: Number,
    unique: true,
    sparse: true // Allows for unique index while also allowing null values for non-drivers
  },
});

// Hash the password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Generate driverId for drivers
  if (this.role === 'driver' && !this.driverId) {
    try {
      // Find the highest driverId and increment by 1
      const lastDriver = await this.constructor.findOne({ role: 'driver' }).sort({ driverId: -1 });
      this.driverId = lastDriver ? lastDriver.driverId + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
