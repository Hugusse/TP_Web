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
