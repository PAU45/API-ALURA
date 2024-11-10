// app.js o server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const carritoRoutes = require('./routes/carrito');
const metodoPagoRoutes = require('./routes/metodo-pago');
const pedidosRoutes = require('./routes/pedidos');
const productosRoutes = require('./routes/productos');
const reseñaRoutes = require('./routes/reseña');
const usuariosRoutes = require('./routes/usuarios');

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());

// Rutas
app.use('/api/carrito', carritoRoutes);
app.use('/api/metodo-pago', metodoPagoRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/reseña', reseñaRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Puerto y servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
