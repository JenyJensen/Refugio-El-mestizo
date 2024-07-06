document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/animales')
        .then(response => response.json())
        .then(animales => {
            const listaPerrosBox = document.querySelector('.lista-perros-box');
            animales.forEach(animal => {
                const animalDiv = document.createElement('div');
                animalDiv.classList.add('lista-perros-box');
                animalDiv.innerHTML = `
                    <p>${animal.Nombre}, ${animal.descripcion}</p>
                    <img src="../static/img/${animal.foto}" alt="${animal.raza}" width="90%">
                `;
                listaPerrosBox.appendChild(animalDiv);
            });
        });
});
