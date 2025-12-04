// carrito.js - Gestión del carrito de compras

document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Elementos DOM
    const carritoVacio = document.getElementById('carrito-vacio');
    const carritoContenido = document.getElementById('carrito-contenido');
    const carritoItems = document.getElementById('carrito-items');
    const totalItems = document.getElementById('total-items');
    const subtotalElement = document.getElementById('subtotal');
    const ivaElement = document.getElementById('iva');
    const totalElement = document.getElementById('total');
    const cartCount = document.getElementById('cart-count');
    const btnCheckout = document.getElementById('btn-checkout');
    
    // Actualizar contador del carrito
    function actualizarContador() {
        const total = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
        cartCount.textContent = total;
    }
    
    // Calcular totales
    function calcularTotales() {
        let subtotal = 0;
        
        carrito.forEach(producto => {
            subtotal += producto.precio * producto.cantidad;
        });
        
        const envio = 99.00;
        const iva = subtotal * 0.16;
        const total = subtotal + envio + iva;
        
        subtotalElement.textContent = `$${subtotal.toLocaleString()} MXN`;
        ivaElement.textContent = `$${iva.toLocaleString()} MXN`;
        totalElement.textContent = `$${total.toLocaleString()} MXN`;
        
        return total;
    }
    
    // Mostrar productos en el carrito
    function mostrarCarrito() {
        // Verificar si hay productos
        if (carrito.length === 0) {
            carritoVacio.style.display = 'block';
            carritoContenido.style.display = 'none';
            btnCheckout.disabled = true;
        } else {
            carritoVacio.style.display = 'none';
            carritoContenido.style.display = 'block';
            btnCheckout.disabled = false;
            
            // Limpiar lista
            carritoItems.innerHTML = '';
            
            // Mostrar cada producto
            carrito.forEach((producto, index) => {
                const productoElement = document.createElement('div');
                productoElement.className = 'carrito-item';
                productoElement.innerHTML = `
                    <div class="item-imagen">
                        <img src="${producto.imagen || 'img/default-product.jpg'}" alt="${producto.nombre}">
                    </div>
                    <div class="item-info">
                        <h4>${producto.nombre}</h4>
                        <p class="item-desc">${producto.descripcion || 'Producto de alta calidad'}</p>
                        <div class="item-especificaciones">
                            <span><i class="fas fa-microchip"></i> ${producto.procesador || 'Procesador'}</span>
                            <span><i class="fas fa-memory"></i> ${producto.ram || 'Memoria RAM'}</span>
                            <span><i class="fas fa-hdd"></i> ${producto.almacenamiento || 'Almacenamiento'}</span>
                        </div>
                    </div>
                    <div class="item-precio">
                        <span class="precio-unitario">$${producto.precio.toLocaleString()} MXN</span>
                        <div class="item-cantidad">
                            <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="cantidad">${producto.cantidad}</span>
                            <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <span class="precio-total">$${(producto.precio * producto.cantidad).toLocaleString()} MXN</span>
                    </div>
                    <div class="item-acciones">
                        <button class="btn-eliminar" onclick="eliminarProducto(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                carritoItems.appendChild(productoElement);
            });
            
            // Actualizar contador de items
            totalItems.textContent = carrito.reduce((sum, p) => sum + p.cantidad, 0);
        }
        
        // Calcular totales
        calcularTotales();
        actualizarContador();
    }
    
    // Cambiar cantidad de un producto
    window.cambiarCantidad = function(index, cambio) {
        if (carrito[index]) {
            carrito[index].cantidad += cambio;
            
            // Si la cantidad es 0 o menor, eliminar producto
            if (carrito[index].cantidad <= 0) {
                carrito.splice(index, 1);
            }
            
            // Guardar en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
            
            // Actualizar vista
            mostrarCarrito();
        }
    };
    
    // Eliminar producto del carrito
    window.eliminarProducto = function(index) {
        if (confirm('¿Estás seguro de eliminar este producto del carrito?')) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        }
    };
    
    // Vaciar carrito completo
    window.vaciarCarrito = function() {
        if (confirm('¿Estás seguro de vaciar todo el carrito?')) {
            localStorage.removeItem('carrito');
            carrito.length = 0;
            mostrarCarrito();
        }
    };
    
    // Inicializar
    mostrarCarrito();
    
    // Actualizar contador en todas las páginas
    window.actualizarContadorCarrito = actualizarContador;
});