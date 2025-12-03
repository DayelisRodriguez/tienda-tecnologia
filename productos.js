// Base de datos de productos
const productos = [
    {
        id: 1,
        nombre: "Laptop Gaming Pro",
        descripcion: "Laptop potente para gaming y trabajo profesional",
        precio: 1299.99,
        categoria: "laptops",
        imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
        destacado: true
    },
    {
        id: 2,
        nombre: "Smartphone X12",
        descripcion: "Smartphone con cámara de 108MP y 5G",
        precio: 899.99,
        categoria: "smartphones",
        imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        destacado: true
    },
    {
        id: 3,
        nombre: "Tablet Pro Max",
        descripcion: "Tablet profesional con stylus incluido",
        precio: 699.99,
        categoria: "tablets",
        imagen: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
        destacado: false
    },
    {
        id: 4,
        nombre: "Auriculares Wireless",
        descripcion: "Auriculares con cancelación de ruido activa",
        precio: 249.99,
        categoria: "accesorios",
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        destacado: true
    },
    {
        id: 5,
        nombre: "Monitor 4K Ultra",
        descripcion: "Monitor 32 pulgadas 4K HDR",
        precio: 599.99,
        categoria: "monitores",
        imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
        destacado: false
    },
    {
        id: 6,
        nombre: "Teclado Mecánico RGB",
        descripcion: "Teclado mecánico para gaming con iluminación RGB",
        precio: 129.99,
        categoria: "accesorios",
        imagen: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400",
        destacado: true
    },
    {
        id: 7,
        nombre: "Mouse Gamer Pro",
        descripcion: "Mouse con sensor óptico de alta precisión",
        precio: 79.99,
        categoria: "accesorios",
        imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
        destacado: false
    },
    {
        id: 8,
        nombre: "Webcam HD Pro",
        descripcion: "Webcam 1080p con micrófono integrado",
        precio: 149.99,
        categoria: "accesorios",
        imagen: "https://images.unsplash.com/photo-1616750689468-7a5b8e305d75?w=400",
        destacado: false
    }
];

// Función para obtener todos los productos
function obtenerProductos() {
    return productos;
}

// Función para obtener productos destacados
function obtenerProductosDestacados() {
    return productos.filter(p => p.destacado);
}

// Función para obtener producto por ID
function obtenerProductoPorId(id) {
    return productos.find(p => p.id === parseInt(id));
}

// Función para filtrar productos por categoría
function filtrarPorCategoria(categoria) {
    if (!categoria || categoria === 'todos') {
        return productos;
    }
    return productos.filter(p => p.categoria === categoria);
}