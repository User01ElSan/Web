
// VARIABLES GLOBALES

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let favoritos = [];


// CARRITO DE COMPRAS

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert(nombre + " agregado al carrito ");

  if (typeof mostrarCarrito === "function") {
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = producto.nombre + " - S/ " + producto.precio;
    lista.appendChild(li);
    suma += producto.precio;
  });

  total.textContent = "Total: S/ " + suma;
}

// 
// BUSCADOR

function buscarProducto() {
  const input = document.getElementById("buscador").value.toLowerCase();
  const productos = document.querySelectorAll(".producto");

  productos.forEach((prod) => {
    const nombre = prod.textContent.toLowerCase();

    if (nombre.includes(input)) {
      prod.style.display = "block";
    } else {
      prod.style.display = "none";
    }
  });
}


// LOGIN 

function login() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje-login");

  if (user === "admin" && pass === "1234") {
    mensaje.textContent = "Bienvenido";
    mensaje.style.color = "green";

    setTimeout(() => {
  window.location.href = "catalogo.html";
}, 1000);
  } else {
    mensaje.textContent = "Datos incorrectos";
    mensaje.style.color = "red";
  }
}


// FAVORITOS

function toggleFavorito(elemento, nombre) {
  if (favoritos.includes(nombre)) {
    favoritos = favoritos.filter(f => f !== nombre);
    elemento.style.color = "black";
  } else {
    favoritos.push(nombre);
    elemento.style.color = "red";
  }
}


// VALIDACIÓN FORMULARIO

function validarFormulario() {
  const correo = document.getElementById("correo").value;
  const mensaje = document.getElementById("mensaje-form");

  if (correo === "" || !correo.includes("@")) {
    mensaje.textContent = "Correo inválido";
    mensaje.style.color = "red";
    return false;
  }

  mensaje.textContent = "Formulario enviado correctamente";
  mensaje.style.color = "green";
  return true;
}

window.onload = function () {
  const guardado = JSON.parse(localStorage.getItem("carrito"));

  if (guardado) {
    carrito = guardado;
  }

  if (typeof mostrarCarrito === "function") {
    mostrarCarrito();
  }

  if (typeof cargarCarrito === "function") {
    cargarCarrito();
  }
};


// carrito.html

function cargarCarrito() {
  const contenedor = document.getElementById("contenedor-carrito");
  const total = document.getElementById("total");

  if (!contenedor) return;

  const datos = JSON.parse(localStorage.getItem("carrito")) || [];

  contenedor.innerHTML = "";
  let suma = 0;

  datos.forEach((producto) => {
    const div = document.createElement("div");

    div.textContent = producto.nombre + " - S/ " + Number(producto.precio);

    contenedor.appendChild(div);
    suma += Number(producto.precio);
  });

  total.textContent = "Total: S/ " + suma;
}

// ELIMINAR
function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

// VACIAR
function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  cargarCarrito();
}

function validarCompra() {
  const nombre = document.getElementById("nombre").value.trim();
  const tarjeta = document.getElementById("tarjeta").value.trim();
  const fecha = document.getElementById("fecha").value;
  const cvv = document.getElementById("cvv").value.trim();

  if (nombre === "" || tarjeta === "" || fecha === "" || cvv === "") {
    alert("Todos los campos son obligatorios");
    return false;
  }

  if (tarjeta.length < 13 || tarjeta.length > 16) {
    alert("Número de tarjeta inválido");
    return false;
  }

  if (cvv.length !== 3) {
    alert("CVV inválido");
    return false;
  }

  alert("Compra realizada con éxito");

  window.location.href = "Valoracion.html"; // redirige después

  return false;
}