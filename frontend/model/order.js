const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  house: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
  },
  user_id: {
    type: String
  },
  order: {
    type: Array,
  }
});

module.exports = mongoose.model('Order', orderSchema);
