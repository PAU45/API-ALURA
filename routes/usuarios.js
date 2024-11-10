// routes/usuarios.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios');

// Obtener todos los usuarios (solo admin puede hacerlo)
router.get('/', usuarioController.obtenerUsuarios);

// Obtener un usuario por ID (todos pueden ver su propio perfil)
router.get('/:id', usuarioController.obtenerUsuarioPorId);

// Agregar un nuevo usuario (solo admin puede hacerlo)
router.post('/', usuarioController.agregarUsuario);

// Actualizar un usuario (solo admin puede hacerlo)
router.put('/:id', usuarioController.actualizarUsuario);

// Eliminar un usuario (solo admin puede hacerlo)
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
