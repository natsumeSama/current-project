// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Sign up
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash du mot de passe
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            fav: [],
            plan:[]
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        // Ici, vous pouvez générer un token JWT ou gérer la session de l'utilisateur
        res.status(200).json({ userName: user.username});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:email', async (req, res) => {
    const email = req.params.email; // Obtenez la valeur de 'v' depuis les paramètres de l'URL

    try {
        const user = await User.findOne({ email: email }); // Pas de projection, tous les champs seront retournés
        res.json({fav: user.fav});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:email/:fav', async (req, res) => {
    const email = req.params.email;
    const newFavItem = req.params.fav; // L'élément à ajouter aux favoris

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        user.fav.push(newFavItem); // Ajouter l'élément au tableau fav
        await user.save(); // Enregistrer les modifications
        res.status(200).json({ message: 'Élément ajouté aux favoris', fav: user.fav });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:email/:fav', async (req, res) => {
    const email = req.params.email;
    const favItemToRemove = req.params.fav; // L'élément à ajouter aux favoris

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        user.fav = user.fav.filter(item => item !== favItemToRemove); // Ajouter l'élément au tableau fav
        await user.save(); // Enregistrer les modifications
        res.status(200).json({ message: 'Élément supprimer des favoris', fav: user.fav });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
