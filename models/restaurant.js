// models/restaurant.js

const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    openingHours: { type: String, required: true },
    description: { type: String, required: true },
    cuisineType: { type: String, required: true },
    specialServices: { type: [String] },
    image: { type: String },
    v :{type: String, required: true}

});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
