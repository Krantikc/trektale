const mongoose = require('mongoose');
const autoIncrement = require('@alec016/mongoose-autoincrement');

const EventSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    unique: true,
    index: {unique: true}
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
  },
  availability: {
    type: Number
  },
  images: {
    type: Array
  },
  rating: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

autoIncrement.initialize(mongoose.connection);

EventSchema.plugin(autoIncrement.plugin, {
  model: 'Event',
  field: 'eventId',
  startAt: 100,
});

module.exports = mongoose.model('Event', EventSchema);