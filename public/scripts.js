document.addEventListener('DOMContentLoaded', () => {
    // Charger les produits depuis l'API
    fetch('https://musicbrainz.org/ws/2/')
        .then(response => response.json())
        .then(data => {
            const productsList = document.getElementById('products-list');
            productsList.innerHTML = ''; // Vider la liste avant d'ajouter les nouveaux produits
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Prix: ${product.price}€</p>
                    <button class="btn" onclick="addToCart(${product._id})">Ajouter au panier</button>
                `;
                productsList.appendChild(productDiv);
            });
        })
        .catch(error => console.log(error));
});

// Ajouter un produit au panier
function addToCart(productId) {
    fetch('http://localhost:3000/cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => alert('Produit ajouté au panier'))
    .catch(error => console.error('Erreur:', error));
}