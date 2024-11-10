// controllers/productos.js
const productos = require('../models/productos');

// Obtener todos los productos
exports.obtenerProductos = (req, res) => {
  res.json(productos);
};

// Obtener un producto por ID
exports.obtenerProducto = (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
};

// Crear un nuevo producto
exports.crearProducto = (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
};

// Actualizar un producto existente
exports.actualizarProducto = (req, res) => {
  const { id } = req.params;
  const producto = productos.find(p => p.id === parseInt(id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  Object.assign(producto, req.body);
  res.json(producto);
};

// Eliminar un producto
exports.eliminarProducto = (req, res) => {
  const { id } = req.params;
  const productoIndex = productos.findIndex(p => p.id === parseInt(id));
  if (productoIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  productos.splice(productoIndex, 1);
  res.status(204).send();
};
