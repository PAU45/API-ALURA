// controllers/reseña.js
const reseñas = require('../models/reseña');
const productos = require('../models/productos');

// Crear una reseña
exports.crearReseña = (req, res) => {
  const { productoId, comentario, calificación } = req.body;
  const producto = productos.find(p => p.id === parseInt(productoId));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const nuevaReseña = {
    id: reseñas.length + 1,
    productoId,
    usuarioId: req.user.id,
    comentario,
    calificación,
    fecha: new Date()
  };

  reseñas.push(nuevaReseña);
  res.status(201).json(nuevaReseña);
};

// Obtener las reseñas de un producto
exports.obtenerReseñas = (req, res) => {
  const { productoId } = req.params;
  const reseñasProducto = reseñas.filter(r => r.productoId === parseInt(productoId));
  res.json(reseñasProducto);
};
