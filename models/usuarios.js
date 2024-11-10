// models/usuario.js
const usuarios = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan.perez@email.com',
      password: '123456', // Contraseña en hash
      rol: 'admin', // O 'admin'
    },
    {
      id: 2,
      nombre: 'Ana García',
      email: 'ana.garcia@email.com',
      password: '12', // Contraseña en hash
      rol: 'usuario',
    },
    // Agregar más usuarios aquí...
  ];
  
  module.exports = usuarios;
  