// routes/pedidos.js
const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos');

// Crear un nuevo pedido
router.post('/', pedidosController.crearPedido);

// Obtener todos los pedidos de un usuario
router.get('/', pedidosController.obtenerPedidos);

// Actualizar el estado de un pedido
router.put('/:id', pedidosController.actualizarPedido);

module.exports = router;
