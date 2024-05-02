// routes/hotel.js

const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel'); // Le nom du modèle doit correspondre exactement au nom du fichier

// Route pour obtenir la liste de tous les hôtels
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour créer un nouvel hôtel
router.post('/', async (req, res) => {
    const hotel = new Hotel({
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        stars: req.body.stars,
        roomTypes: req.body.roomTypes,
        startingRate: req.body.startingRate,
        services: req.body.services,
        image: req.body.image,
        v :req.body.v
    });

    try {
        const newHotel = await hotel.save();
        res.status(201).json(newHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ajout de deux nouveaux hôtels
router.post('/add-multiple', async (req, res) => {
    const hotels = [
        {
            name: "Hotel A",
            address: "123 Rue Principale",
            phoneNumber: "+123 456 789",
            stars: 4,
            roomTypes: ["Chambre Single", "Chambre Double", "Suite"],
            startingRate: 100,
            services: ["Petit-déjeuner inclus", "WiFi gratuit", "Parking"],
            image: "https://i.imgur.com/WPcy3B6.jpeg",
            v :"06"
        }
        
    ];

    try {
        const savedHotels = await Hotel.insertMany(hotels);
        res.status(201).json(savedHotels);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
