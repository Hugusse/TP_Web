async function search() {
    let query = document.getElementById("searchInput").value;
    if (!query) {
        alert("Veuillez entrer un artiste ou une chanson !");
        return;
    }

    try {
        let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${query}`);
        if (!response.ok) throw new Error("Erreur avec l'API Deezer");

        let data = await response.json();
        console.log(data); // Vérifier si les données arrivent

    } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur s'est produite. Vérifiez la console !");
    }
}

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