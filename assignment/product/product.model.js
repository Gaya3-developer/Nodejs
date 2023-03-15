const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, required: true },
    published: { type: Boolean, required: true, default: false },
    image: { type: String, required: true },
    price: { type: Number, required: true, default: 200 },
    rating: { type: Number, required: true, default: 3 },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;