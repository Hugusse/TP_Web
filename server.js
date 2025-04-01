const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/instrumentsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Product = mongoose.model('Product', {
    name: String,
    type: String,
    price: Number,
    description: String,
    image: String
});

// Endpoint pour récupérer les produits
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Endpoint pour ajouter un produit au panier (exemple)
app.post('/cart', (req, res) => {
    const cartItem = req.body;
    // Tu peux enregistrer le panier dans une base de données ici
    res.json({ message: 'Produit ajouté au panier' });
});

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});