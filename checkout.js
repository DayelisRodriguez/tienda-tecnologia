// checkout.js
document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito desde LocalStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const metodoPagoSeleccionado = 'tarjeta';
    
    // Elementos DOM
    const productosResumen = document.getElementById('productos-resumen');
    const subtotalResumen = document.getElementById('subtotal-resumen');
    const ivaResumen = document.getElementById('iva-resumen');
    const totalResumen = document.getElementById('total-resumen');
    const totalPagar = document.getElementById('total-pagar');
    const btnProcesarPago = document.getElementById('btn-procesar-pago');
    const referenciaSpan = document.getElementById('referencia');
    
    // Generar referencia única
    const referencia = 'TECH-' + new Date().getFullYear() + '-' + 
                      Math.floor(1000 + Math.random() * 9000);
    referenciaSpan.textContent = referencia;
    
    // Calcular totales
    function calcularTotales() {
        let subtotal = 0;
        
        // Mostrar productos en resumen
        productosResumen.innerHTML = '';
        carrito.forEach(producto => {
            const totalProducto = producto.precio * producto.cantidad;
            subtotal += totalProducto;
            
            const productoElement = document.createElement('div');
            productoElement.className = 'producto-resumen';
            productoElement.innerHTML = `
                <div class="producto-info">
                    <span class="producto-nombre">${producto.nombre}</span>
                    <span class="producto-cantidad">x${producto.cantidad}</span>
                </div>
                <span class="producto-total">$${totalProducto.toLocaleString()} MXN</span>
            `;
            productosResumen.appendChild(productoElement);
        });
        
        const envio = 99.00;
        const iva = subtotal * 0.16;
        const total = subtotal + envio + iva;
        
        // Actualizar totales
        subtotalResumen.textContent = `$${subtotal.toLocaleString()} MXN`;
        ivaResumen.textContent = `$${iva.toLocaleString()} MXN`;
        totalResumen.textContent = `$${total.toLocaleString()} MXN`;
        totalPagar.textContent = total.toLocaleString();
    }
    
    // Cambiar método de pago
    const opcionesPago = document.querySelectorAll('.metodo-opcion');
    const formsPago = {
        'tarjeta': document.getElementById('form-tarjeta'),
        'paypal': document.getElementById('form-paypal'),
        'transferencia': document.getElementById('form-transferencia')
    };
    
    opcionesPago.forEach(opcion => {
        opcion.addEventListener('click', function() {
            // Quitar clase active de todas
            opcionesPago.forEach(o => o.classList.remove('active'));
            // Agregar al clickeado
            this.classList.add('active');
            
            // Ocultar todos los formularios
            Object.values(formsPago).forEach(form => {
                form.style.display = 'none';
            });
            
            // Mostrar el formulario correspondiente
            const metodo = this.getAttribute('data-metodo');
            formsPago[metodo].style.display = 'block';
            metodoPagoSeleccionado = metodo;
        });
    });
    
    // Validar formulario de tarjeta
    function validarTarjeta() {
        const numero = document.getElementById('numero-tarjeta').value.replace(/\s/g, '');
        const fecha = document.getElementById('fecha-expiracion').value;
        const cvv = document.getElementById('cvv').value;
        const nombre = document.getElementById('nombre-tarjeta').value;
        
        // Validaciones básicas (simulación)
        if (numero.length !== 16) {
            alert('Número de tarjeta debe tener 16 dígitos');
            return false;
        }
        
        if (!/^\d{2}\/\d{2}$/.test(fecha)) {
            alert('Formato de fecha inválido (MM/AA)');
            return false;
        }
        
        if (cvv.length !== 3) {
            alert('CVV debe tener 3 dígitos');
            return false;
        }
        
        if (nombre.trim().length < 5) {
            alert('Ingresa el nombre completo');
            return false;
        }
        
        return true;
    }
    
    // Simular procesamiento de pago
    btnProcesarPago.addEventListener('click', function() {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        let valido = true;
        
        // Validar según método seleccionado
        if (metodoPagoSeleccionado === 'tarjeta') {
            valido = validarTarjeta();
        }
        
        if (valido) {
            // Mostrar carga
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            this.disabled = true;
            
            // Simular procesamiento
            setTimeout(() => {
                // Guardar compra en localStorage (simulación)
                const compra = {
                    fecha: new Date().toISOString(),
                    productos: carrito,
                    total: document.getElementById('total-pagar').textContent,
                    metodo: metodoPagoSeleccionado,
                    referencia: referencia
                };
                
                localStorage.setItem('ultimaCompra', JSON.stringify(compra));
                
                // Vaciar carrito
                localStorage.removeItem('carrito');
                
                // Mostrar modal de éxito
                document.getElementById('numero-orden').textContent = referencia;
                document.getElementById('modal-exito').style.display = 'flex';
                
                // Actualizar contador de carrito en index.html
                localStorage.setItem('carritoActualizado', 'true');
            }, 2000);
        }
    });
    
    // Formatear número de tarjeta
    document.getElementById('numero-tarjeta').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value.substring(0, 19);
    });
    
    // Formatear fecha
    document.getElementById('fecha-expiracion').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value.substring(0, 5);
    });
    
    // Inicializar
    calcularTotales();
});