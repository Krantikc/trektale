const mongoose = require('mongoose');
const autoIncrement = require('@alec016/mongoose-autoincrement');

const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    index: {unique: true}
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  mobile: {
    type: Number,
    unique: true,
    required: true,
    match: [/[0-9]+/, 'Please enter a valid mobile number']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  roles: [{
    type: String,
  }]
}, {
  versionKey: false
});

autoIncrement.initialize(mongoose.connection);

UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'userId',
  startAt: 100,
});


module.exports = mongoose.model('User', UserSchema);
