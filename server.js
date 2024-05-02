// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Import des routes d'authentification
const restaurantRoutes = require('./routes/restaurant'); // Import des routes pour la gestion des restaurants
const hotelRoutes = require('./routes/hotel'); // Import des routes pour la gestion des hôtels
const activityRoutes = require('./routes/Activity'); // Import des routes pour la gestion des activités

const app = express();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connecté à la base de données'));

app.use(express.json());



// Utilisation des routes d'authentification
app.use('/auth', authRoutes);

// Utilisation des routes pour la gestion des restaurants
app.use('/restaurants', restaurantRoutes);

// Utilisation des routes pour la gestion des hôtels
app.use('/hotels', hotelRoutes);

// Utilisation des routes pour la gestion des activités
app.use('/activities', activityRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
