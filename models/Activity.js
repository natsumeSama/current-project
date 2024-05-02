const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    openingHours: {
         type: String,
        required: true 
   },
    
    phoneNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: { 
        type: String 
        
        
    },
    v :{
        type: String, 
        required: true}
   
});

module.exports = mongoose.model('Activity', activitySchema);
