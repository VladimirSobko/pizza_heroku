const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
  name: {
    type: String,
  },
  priceUSD: {
    type: String,
  },
  priceEUR: {
    type: String,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
  _id: {
    type: String,
  }
});

module.exports = mongoose.model('Pizza', pizzaSchema);

