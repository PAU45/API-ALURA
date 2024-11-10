// controllers/pedidos.js
const pedidos = require('../models/pedidos');
const carritos = require('../models/carrito');
const productos = require('../models/productos');

// Crear un nuevo pedido
exports.crearPedido = (req, res) => {
  const carrito = carritos.find(c => c.usuarioId === req.user.id);
  if (!carrito) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  let total = 0;
  carrito.productos.forEach(item => {
    const producto = productos.find(p => p.id === item.productoId);
    if (producto) {
      total += producto.precio * item.cantidad;
    }
  });

  const nuevoPedido = {
    id: pedidos.length + 1,
    usuarioId: req.user.id,
    productos: carrito.productos,
    total,
    estado: 'pendiente', // Por ejemplo: 'pendiente', 'enviado', 'entregado'
    metodo_pago: req.body.metodo_pago,
    fecha_creacion: new Date(),
    fecha_actualizacion: new Date()
  };

  pedidos.push(nuevoPedido);

  // Limpiar el carrito después de realizar el pedido
  carrito.productos = [];

  res.status(201).json(nuevoPedido);
};

// Ver los pedidos de un usuario
exports.obtenerPedidos = (req, res) => {
  const usuarioPedidos = pedidos.filter(p => p.usuarioId === req.user.id);
  res.json(usuarioPedidos);
};

// Actualizar el estado de un pedido
exports.actualizarPedido = (req, res) => {
  const { id } = req.params;
  const pedido = pedidos.find(p => p.id === parseInt(id));
  if (!pedido) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  pedido.estado = req.body.estado || pedido.estado;
  pedido.fecha_actualizacion = new Date();

  res.json(pedido);
};
