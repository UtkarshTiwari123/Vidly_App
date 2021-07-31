const mongoose = require('mongoose');
const Customers =mongoose.model('Customers',new mongoose.Schema({
    isGold : {
        type:Boolean,
        required: false
    },
    name: {
      type : String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    phone : {
        type : String,
        required: true,
        min : 5,
        max : 10,
    }
  }));

  module.exports.Customers = Customers;
  