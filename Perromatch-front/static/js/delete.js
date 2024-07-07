function deleteAnimal(id) {
    fetch(`/api/animales/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Animal eliminado exitosamente!');
        // Aquí podrías recargar la lista de animales
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al eliminar el animal.');
    });
}