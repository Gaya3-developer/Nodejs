const mongoose = require('mongoose');
const User = require('./user.model');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  published: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
//   createdBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
}, { timestamps: true });

module.exports = mongoose.model('Products', productsSchema);