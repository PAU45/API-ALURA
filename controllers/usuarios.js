// controllers/usuarios.js
const usuarios = require('../models/usuarios');

// Obtener todos los usuarios (solo un admin puede hacerlo)
exports.obtenerUsuarios = (req, res) => {
  const { rol } = req.query;  // Suponemos que el rol del usuario está en la query

  // Verificamos si el rol es 'admin' y si no, bloqueamos el acceso
  if (rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Solo los administradores pueden ver todos los usuarios.' });
  }

  res.json(usuarios); // Retorna todos los usuarios
};

// Obtener un usuario por ID (todos pueden ver su propio perfil)
exports.obtenerUsuarioPorId = (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find(u => u.id === parseInt(id));  // Buscar usuario por ID

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json(usuario);  // Devuelve el usuario encontrado
};

// Agregar un nuevo usuario (solo un admin puede agregar usuarios)
exports.agregarUsuario = (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  // Verificamos que el rol del usuario sea valido ('admin' o 'usuario')
  if (!nombre || !correo || !rol || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, correo, password y rol' });
  }

  if (rol !== 'admin' && rol !== 'usuario') {
    return res.status(400).json({ error: 'Rol inválido. El rol debe ser "admin" o "usuario".' });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,  // Generamos un ID único
    nombre,
    correo,
    password,
    rol
  };

  usuarios.push(nuevoUsuario);  // Agregamos el nuevo usuario al arreglo
  res.status(201).json(nuevoUsuario);  // Respondemos con el nuevo usuario creado
};

// Actualizar un usuario (solo un admin puede actualizar el rol de un usuario)
exports.actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find(u => u.id === parseInt(id));  // Buscar usuario por ID

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { nombre, correo, rol, password } = req.body;

  // Si no se pasan todos los campos, devolver error
  if (!nombre || !correo || !rol || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, correo, password y rol' });
  }

  // Solo los administradores pueden cambiar el rol de un usuario
  if (rol !== 'admin' && rol !== 'usuario') {
    return res.status(400).json({ error: 'Rol inválido. El rol debe ser "admin" o "usuario".' });
  }

  // Actualizamos los datos del usuario
  usuario.nombre = nombre;
  usuario.correo = correo;
  usuario.password = password;
  usuario.rol = rol;

  res.json(usuario);  // Devuelve el usuario actualizado
};

// Eliminar un usuario (solo un admin puede eliminar usuarios)
exports.eliminarUsuario = (req, res) => {
  const { id } = req.params;
  const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(id));  // Buscar el índice del usuario

  if (usuarioIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Solo los administradores pueden eliminar usuarios
  usuarios.splice(usuarioIndex, 1);  // Elimina el usuario del arreglo
  res.status(204).json({ message: 'Usuario eliminado con éxito' });  // Responde con código 204 (sin contenido)
};