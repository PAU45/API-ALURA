// routes/productos.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos');

// Obtener todos los productos
router.get('/', productosController.obtenerProductos);

// Obtener un producto por ID
router.get('/:id', productosController.obtenerProducto);

// Crear un nuevo producto
router.post('/', productosController.crearProducto);

// Actualizar un producto
router.put('/:id', productosController.actualizarProducto);

// Eliminar un producto
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;
