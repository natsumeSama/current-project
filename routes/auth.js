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
            password: hashedPassword
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
        res.status(200).json({ message: 'Connexion réussie' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
