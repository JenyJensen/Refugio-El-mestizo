document.addEventListener("DOMContentLoaded", function () {
    // Cargar encabezado
    fetch('fragments/navbar')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
        });
        fetch("fragments/footer")
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-placeholder').innerHTML = html;
        });

}
)
