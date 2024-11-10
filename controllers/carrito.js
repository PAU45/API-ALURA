// controllers/carrito.js
const carritos = require('../models/carrito');  // Suponiendo que tienes un modelo de carrito
const productos = require('../models/productos'); // Suponiendo que tienes un modelo de productos

// Obtener el carrito de un usuario
exports.obtenerCarrito = (req, res) => {
  const carrito = carritos.find(c => c.usuarioId === req.user.id);
  if (!carrito) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }
  res.json(carrito);
};

// Agregar un producto al carrito
exports.agregarAlCarrito = (req, res) => {
  const { productoId, cantidad } = req.body;
  const carrito = carritos.find(c => c.usuarioId === req.user.id);

  if (!carrito) {
    carritos.push({ usuarioId: req.user.id, productos: [{ productoId, cantidad }] });
  } else {
    const productoEnCarrito = carrito.productos.find(p => p.productoId === productoId);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidad;
    } else {
      carrito.productos.push({ productoId, cantidad });
    }
  }

  res.status(200).json({ message: 'Producto agregado al carrito' });
};

// Eliminar un producto del carrito
exports.eliminarDelCarrito = (req, res) => {
  const { productoId } = req.params;
  const carrito = carritos.find(c => c.usuarioId === req.user.id);

  if (!carrito) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  const productoIndex = carrito.productos.findIndex(p => p.productoId === parseInt(productoId));
  if (productoIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  }

  carrito.productos.splice(productoIndex, 1);
  res.status(200).json({ message: 'Producto eliminado del carrito' });
};
