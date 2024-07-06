function toggleSelect() {
    const checkbox = document.getElementById('mostrarSelect');
    const selectContainer = document.getElementById('selectContainer');
    
    if (checkbox.checked) {
        selectContainer.style.display = 'block';
    } else {
        selectContainer.style.display = 'none';
    }
}
/*validaciones de formulario*/

document.getElementById('formulario-contacto').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('nombre-error').textContent = '';
    document.getElementById('telefono-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;
    // Variable para rastrear si hay errores
    let hayErrores = false;
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        document.getElementById('nombre-error').textContent = 'El nombre solo puede contener letras y espacios.';
        hayErrores = true;
    }

    // Validar campo numérico
    if (!/^\d+$/.test(telefono)) {
        document.getElementById('telefono-error').textContent = 'El telefono solo puede contener números.';
        hayErrores = true;
    }

    // Validar campo de correo electrónico
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        document.getElementById('email-error').textContent = 'Por favor, ingrese un correo electrónico válido.';
        hayErrores = true;
    }

    // Si no hay errores, enviar el formulario
    if (!hayErrores) {
        alert('Formulario enviado exitosamente.');
        document.getElementById('formulario-contacto').submit();
    }
});
