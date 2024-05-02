// models/Hotel.js

const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    roomTypes: {
        type: [String],
        required: true
    },
    startingRate: {
        type: Number,
        required: true
    },
    services: {
        type: [String],
        required: true
    },
    image: { 
        type: String 
        
        
    },
    v :{
        type: String,
         required: true}
});

module.exports = mongoose.model('Hotel', hotelSchema);
