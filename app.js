// app.js - Funciones generales de la tienda

// Datos de productos (puedes mover esto a productos.js si prefieres)
const productos = [
    {
        id: 1,
        nombre: "Laptop Gaming Pro",
        descripcion: "RTX 4080, 32GB RAM, 2TB SSD",
        precio: 25999,
        categoria: "laptops",
        imagen: "img/laptop-gaming.jpg"
    },
    {
        id: 2,
        nombre: "MacBook Air M2",
        descripcion: "Chip M2, 8GB RAM, 256GB SSD",
        precio: 19999,
        categoria: "laptops",
        imagen: "img/macbook-air.jpg"
    },
    {
        id: 3,
        nombre: "PC Gamer Armada",
        descripcion: "Ryzen 7, RTX 3060, 16GB RAM",
        precio: 18999,
        categoria: "desktops",
        imagen: "img/pc-gamer.jpg"
    },
    {
        id: 4,
        nombre: "Monitor 4K 32\"",
        descripcion: "Resolución 4K, 144Hz, HDR",
        precio: 8999,
        categoria: "monitores",
        imagen: "img/monitor-4k.jpg"
    },
    {
        id: 5,
        nombre: "Teclado Mecánico RGB",
        descripcion: "Switches Blue, Retroiluminación RGB",
        precio: 1299,
        categoria: "accesorios",
        imagen: "img/teclado-mecanico.jpg"
    },
    {
        id: 6,
        nombre: "Mouse Gaming Pro",
        descripcion: "25,600 DPI, 8 botones programables",
        precio: 899,
        categoria: "accesorios",
        imagen: "img/mouse-gaming.jpg"
    }
];

// Función para cargar productos destacados
function cargarProductosDestacados() {
    const container = document.getElementById('featured-products');
    
    if (!container) return;
    
    // Tomar solo 4 productos como destacados
    const destacados = productos.slice(0, 4);
    
    container.innerHTML = '';
    
    destacados.forEach(producto => {
        const productoHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p class="product-description">${producto.descripcion}</p>
                    <div class="product-price">
                        <span class="price">$${producto.precio.toLocaleString()} MXN</span>
                        <button class="btn-add-to-cart" onclick="agregarAlCarrito(${producto.id})">
                            🛒 Agregar
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productoHTML;
    });
}

// Función para agregar producto al carrito
window.agregarAlCarrito = function(productoId) {
    const producto = productos.find(p => p.id === productoId);
    
    if (!producto) {
        alert('Producto no encontrado');
        return;
    }
    
    // Obtener carrito actual
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(p => p.id === productoId);
    
    if (productoExistente) {
        // Incrementar cantidad
        productoExistente.cantidad += 1;
    } else {
        // Agregar nuevo producto
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar contador
    actualizarContadorCarrito();
    
    // Mostrar notificación
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
};

// Función para actualizar contador del carrito
function actualizarContadorCarrito() {
    const cartCounts = document.querySelectorAll('#cart-count');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    
    cartCounts.forEach(element => {
        element.textContent = total;
    });
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje) {
    // Crear notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${mensaje}</span>
    `;
    
    // Estilos de la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
    `;
    
    // Agregar al body
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Agregar estilos CSS para la animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .product-card {
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: transform 0.3s;
    }
    
    .product-card:hover {
        transform: translateY(-5px);
    }
    
    .product-image img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    
    .product-info {
        padding: 20px;
    }
    
    .product-info h3 {
        margin: 0 0 10px 0;
        color: #333;
    }
    
    .product-description {
        color: #666;
        font-size: 0.9em;
        margin-bottom: 15px;
    }
    
    .product-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .price {
        font-weight: bold;
        color: #2c3e50;
        font-size: 1.2em;
    }
    
    .btn-add-to-cart {
        background: #3498db;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .btn-add-to-cart:hover {
        background: #2980b9;
    }
`;
document.head.appendChild(style);

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    cargarProductosDestacados();
    actualizarContadorCarrito();
});

// Hacer funciones disponibles globalmente
window.cargarProductosDestacados = cargarProductosDestacados;
window.actualizarContadorCarrito = actualizarContadorCarrito;