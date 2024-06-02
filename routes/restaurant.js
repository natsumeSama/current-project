// routes/restaurant.js

const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Route pour obtenir la liste de tous les restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:v', async (req, res) => {
    const v = req.params.v; // Obtenez la valeur de 'v' depuis les paramètres de l'URL

    try {
        const restaurants = await Restaurant.find({ v: v }); // Pas de projection, tous les champs seront retournés
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/search/:name', async (req, res) => {
    const name = req.params.name; // Obtenez la valeur de 'v' depuis les paramètres de l'URL

    try {
        const restaurants = await Restaurant.find({ name: name }); // Pas de projection, tous les champs seront retournés
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/fav/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Route pour créer un nouveau restaurant
router.post('/', async (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        openingHours: req.body.openingHours,
        description: req.body.description,
        cuisineType: req.body.cuisineType,
        specialServices: req.body.specialServices,
        image: req.body.image,
        v :req.body.v
    });

    try {
        const newRestaurant = await restaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ajout de deux nouveaux restaurants
router.post('/add-multiple', async (req, res) => {
    const restaurants = [
        {
            name: " B",
            address: "456 Rue Principale",
            phoneNumber: "+33 4 56 78 90 12",
            openingHours: "Mon-Sat: 11:00 AM - 11:00 PM",
            description: "Un restaurant typiquement lyonnais offrant une cuisine traditionnelle et savoureuse.",
            cuisineType: "Française",
            specialServices: ["Réservations", "Service de table"],
           image: "https://i.imgur.com/WPcy3B6.jpeg",
            v:"06"
        },
       
        
    ];

    try {
        const savedRestaurants = await Restaurant.insertMany(restaurants);
        res.status(201).json(savedRestaurants);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
