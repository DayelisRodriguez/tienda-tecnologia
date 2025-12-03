// Carrito de compras (almacenado en memoria, sin localStorage)
let carrito = [];

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const contador = document.getElementById('cart-count');
    if (contador) {
        const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = total;
    }
}

// Agregar producto al carrito
function agregarAlCarrito(productoId) {
    const producto = obtenerProductoPorId(productoId);
    if (!producto) return;

    const itemExistente = carrito.find(item => item.id === productoId);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarContadorCarrito();
    mostrarNotificacion('Producto agregado al carrito');
}

// Eliminar producto del carrito
function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarContadorCarrito();
    if (window.location.pathname.includes('carrito.html')) {
        renderizarCarrito();
    }
}

// Actualizar cantidad de producto
function actualizarCantidad(productoId, nuevaCantidad) {
    const item = carrito.find(item => item.id === productoId);
    if (item && nuevaCantidad > 0) {
        item.cantidad = nuevaCantidad;
        actualizarContadorCarrito();
        renderizarCarrito();
    }
}

// Obtener total del carrito
function obtenerTotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// Renderizar productos en la página principal
function renderizarProductosDestacados() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const productosDestacados = obtenerProductosDestacados();
    
    container.innerHTML = productosDestacados.map(producto => `
        <div class="product-card">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div class="product-price">$${producto.precio.toFixed(2)}</div>
            <button class="btn-add-to-cart" onclick="agregarAlCarrito(${producto.id})">
                Agregar al Carrito
            </button>
        </div>
    `).join('');
}

// Renderizar todos los productos en la página de productos
function renderizarTodosProductos() {
    const container = document.getElementById('all-products');
    if (!container) return;

    const todosProductos = obtenerProductos();
    
    container.innerHTML = todosProductos.map(producto => `
        <div class="product-card">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div class="product-price">$${producto.precio.toFixed(2)}</div>
            <button class="btn-add-to-cart" onclick="agregarAlCarrito(${producto.id})">
                Agregar al Carrito
            </button>
        </div>
    `).join('');
}

// Renderizar carrito
function renderizarCarrito() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!container) return;

    if (carrito.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">Tu carrito está vacío</p>';
        if (totalElement) totalElement.textContent = '$0.00';
        return;
    }

    container.innerHTML = carrito.map(item => `
        <div class="cart-item">
            <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.nombre}</h3>
                <p>Precio unitario: $${item.precio.toFixed(2)}</p>
                <p>Subtotal: $${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                <span>${item.cantidad}</span>
                <button onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                <button onclick="eliminarDelCarrito(${item.id})" style="margin-left: 1rem; color: red;">
                    Eliminar
                </button>
            </div>
        </div>
    `).join('');

    if (totalElement) {
        totalElement.textContent = `$${obtenerTotal().toFixed(2)}`;
    }
}

// Procesar checkout
function procesarCheckout() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío');
        return;
    }
    
    // Obtener el método de pago seleccionado
    const metodoPagoElement = document.querySelector('input[name="metodo-pago"]:checked');
    const metodoPago = metodoPagoElement ? metodoPagoElement.value : 'tarjeta-credito';
    
    // Calcular total
    const subtotal = obtenerTotal();
    let descuento = 0;
    let totalFinal = subtotal;
    
    // Aplicar descuento si es Mastercard
    if (metodoPago === 'mastercard') {
        // Mastercard es gratis (sin costo de comisión), por lo que no hay descuento adicional
        // pero el envío ya es gratis
        totalFinal = subtotal;
        mostrarNotificacion(`¡Pago con Mastercard gratis procesado! Total: $${totalFinal.toFixed(2)}`);
    } else {
        mostrarNotificacion(`¡Pedido realizado! Total: $${totalFinal.toFixed(2)} mediante ${metodoPago}`);
    }
    
    // Limpiar carrito y redirigir
    carrito = [];
    actualizarContadorCarrito();
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.textContent = mensaje;
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.remove();
    }, 3000);
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    actualizarContadorCarrito();
    
    // Renderizar según la página actual
    if (document.getElementById('featured-products')) {
        renderizarProductosDestacados();
    }
    
    if (document.getElementById('all-products')) {
        renderizarTodosProductos();
    }
    
    if (document.getElementById('cart-items')) {
        renderizarCarrito();
    }
});