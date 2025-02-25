const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipcode: { type: String, required: true },
    phone: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {
        type: [{ name: String, price: Number, quantity: Number }],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    status: {
        type: String,
        default: "On Processing"
    },
    date: {
        type: Date,
        default: Date.now
    },
    payment: {
        type: Boolean,
        default: false
    }
});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
