// routes/activity.js

const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity'); // Assurez-vous que le nom du modèle correspond exactement au nom du fichier

// Route pour obtenir la liste de toutes les activités
/*router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});*/

router.get('/:v', async (req, res) => {
    const v = req.params.v; // Obtenez la valeur de 'v' depuis les paramètres de l'URL

    try {
        const activities = await Activity.find({ v: v }); // Pas de projection, tous les champs seront retournés
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour créer une nouvelle activité
router.post('/', async (req, res) => {
    const activity = new Activity({
        name: req.body.name,
        price: req.body.price,
        address: req.body.address,
        openingHours: req.body.openingHours,
        phoneNumber: req.body.phoneNumber,
        description: req.body.description,
        image: req.body.image,
        v :req.body.v
    });

    try {
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ajout de plusieurs nouvelles activités
router.post('/add-multiple', async (req, res) => {
    const activities = [
        {
            name: "Plongée Sous Marine",
            price: 3000,
            address: "Bordj El bahri, ECOLE NATIONAL DES SPORTS NAUTIQUES ET SUBAQUATIQUES",
            openingHours:"Mon-Sat: 11:00 AM - 11:00 PM",
            location: "Algérie",
            phoneNumber: "0561136231/0773031091",
            description: "ECOLE NATIONALE DES SPORTS NAUTIQUES ET SUBAQUATIQUES (ENSNSA). Plongée à 5m de profondeur, école de plongée sous-marine, baptême de plongée sous-marine, formations P1 P2 P3, plongées d'exploration, sauvetage, secourisme.",
            image: "https://i.imgur.com/WPcy3B6.jpeg",
            v:"06"
        }
    ];

    try {
        const savedActivities = await Activity.insertMany(activities);
        res.status(201).json(savedActivities);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
