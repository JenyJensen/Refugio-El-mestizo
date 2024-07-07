
document.getElementById('animalForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    let form = document.getElementById('animalForm');
    let formData = new FormData(form);
  
    let url = '/api/animales';
    let method = 'POST'; // Por defecto, es un POST para crear un nuevo animal

    let fileInput = document.getElementById('foto');
    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onloadend = function() {
        let base64Image = reader.result.split(',')[1];
        formData.append('foto', base64Image);

        // Convertir FormData a JSON
        let data = {};
        formData.forEach((value, key) => { data[key] = value });
        let jsonData = JSON.stringify(data);
    // Verificar si hay un campo 'id' en el formulario para determinar si es una actualización
    let animalId = formData.get('id');
    if (animalId) {
        url += `/${animalId}`; // Construir la URL para actualizar el animal
        method = 'PUT'; // Cambiar a método PUT para actualizar
    }

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            if (method === 'POST') {
                alert('Animal cargado exitosamente!');
            } else if (method === 'PUT') {
                alert('Animal actualizado exitosamente!');
            }
            location.reload(); // Recargar la página después de la operación
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al procesar la operación con el animal.');
        });
    };
        reader.readAsDataURL(file);
});

