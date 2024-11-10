// routes/carrito.js
const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito');

// Obtener el carrito de un usuario
router.get('/', carritoController.obtenerCarrito);

// Agregar un producto al carrito
router.post('/agregar', carritoController.agregarAlCarrito);

// Eliminar un producto del carrito
router.delete('/eliminar/:productoId', carritoController.eliminarDelCarrito);

module.exports = router;
