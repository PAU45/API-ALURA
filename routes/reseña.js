// routes/reseña.js
const express = require('express');
const router = express.Router();
const reseñaController = require('../controllers/reseña');

// Crear una reseña para un producto
router.post('/', reseñaController.crearReseña);

// Obtener todas las reseñas de un producto
router.get('/:productoId', reseñaController.obtenerReseñas);

module.exports = router;
