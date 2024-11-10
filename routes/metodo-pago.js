// routes/metodo-pago.js
const express = require('express');
const router = express.Router();
const metodoPagoController = require('../controllers/metodo-pago');

// Obtener todos los métodos de pago disponibles
router.get('/', metodoPagoController.obtenerMetodosPago);

// Obtener un método de pago por ID
router.get('/:id', metodoPagoController.obtenerMetodoPagoPorId);

// Agregar un nuevo método de pago
router.post('/', metodoPagoController.agregarMetodoPago);

// Actualizar un método de pago
router.put('/:id', metodoPagoController.actualizarMetodoPago);

// Eliminar un método de pago
router.delete('/:id', metodoPagoController.eliminarMetodoPago);

module.exports = router;
