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
                     <button class="edit-button" data-id="${animal.ID}">Editar</button>
                    <button class="delete-button" data-id="${animal.ID}">Eliminar</button>
                `;
                listaPerrosBox.appendChild(animalDiv);
            });
             // Agregar event listeners para los botones de eliminar
             document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', function() {
                    const animalId = this.getAttribute('data-id');
                    deleteAnimal(animalId);
                });
            });

            // Agregar event listeners para los botones de editar
            document.querySelectorAll('.edit-button').forEach(button => {
                button.addEventListener('click', function() {
                    const animalId = this.getAttribute('data-id');
                    editAnimal(animalId);
                });
            });
        });
});


function editAnimal(id) {
    getById(id);
}
function getById(id) {
    fetch(`/api/animal/${id}`)
    .then(response => response.json())
    .then(animal => {
        console.log('Respuesta del servidor:', animal);
        document.getElementById('id').value = id;
        document.getElementById('Nombre').value = animal.Nombre;
        document.getElementById('raza').value = animal.raza;
        document.getElementById('peso').value = animal.peso;
        document.getElementById('edad').value = animal.edad;
        document.getElementById('descripcion').value = animal.descripcion;        
        });
}