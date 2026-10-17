const productos = [
    {
        nombre: "Teclado mecánico",
        precio: 45000
    },
    {
        nombre: "Mouse inalámbrico",
        precio: 22000
    },
    {
        nombre: "Monitor 24''",
        precio: 180000
    }
];

const inputNombre = document.querySelector("#nombre");
const inputPrecio = document.querySelector("#precio");
const botonAgregar = document.querySelector("#agregar");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#listaProductos");

let listaCompras = [];

try {

    listaCompras = JSON.parse(localStorage.getItem("listaCompras")) || [];

} catch (error) {

    console.error("Error al cargar los datos:", error);

    mensaje.textContent = "Hubo un problema al cargar la lista.";

    listaCompras = [];

} finally {

    console.log("Carga del almacenamiento finalizada.");

}

renderizarLista();

setTimeout(() => {

    mensaje.textContent = "🎁 ¡Promoción! Hoy tenés un 10% de descuento en monitores.";

}, 3000);

inputNombre.addEventListener("input", () => {

    const producto = productos.find(
        p => p.nombre.toLowerCase() === inputNombre.value.toLowerCase()
    );

    inputPrecio.value = producto ? producto.precio : "";

});

botonAgregar.addEventListener("click", () => {

    const producto = productos.find(
        p => p.nombre.toLowerCase() === inputNombre.value.toLowerCase()
    );

    if (!producto) {

        mensaje.textContent = "Ese producto no existe.";

        return;

    }

    const { nombre, precio } = producto;

    listaCompras.push({
        nombre,
        precio
    });

    localStorage.setItem(
        "listaCompras",
        JSON.stringify(listaCompras)
    );

    mensaje.textContent = "Producto agregado correctamente.";

    inputNombre.value = "";
    inputPrecio.value = "";

    renderizarLista();

});
function renderizarLista() {

    lista.innerHTML = "";

    listaCompras.forEach((producto, indice) => {

        lista.innerHTML += `
            <div class="producto">
                <span>${producto.nombre} — $${producto.precio}</span>
                <button onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>
            </div>
        `;

    });

}

function eliminarProducto(indice) {

    listaCompras.splice(indice, 1);

    localStorage.setItem(
        "listaCompras",
        JSON.stringify(listaCompras)
    );

    mensaje.textContent = "Producto eliminado.";

    renderizarLista();

}