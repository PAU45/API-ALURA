// Suponemos que los métodos de pago están almacenados en memoria por ahora
let metodosPago = [
    { id: 1, metodo: "Tarjeta de crédito", detalles: "Visa, MasterCard, etc." },
    { id: 2, metodo: "PayPal", detalles: "Pago a través de PayPal" },
    // Otros métodos de pago
];

// Obtener todos los métodos de pago disponibles
exports.obtenerMetodosPago = (req, res) => {
  res.json(metodosPago); // Retorna todos los métodos de pago disponibles
};

// Obtener un método de pago por ID
exports.obtenerMetodoPagoPorId = (req, res) => {
  const { id } = req.params;
  const metodoPago = metodosPago.find(m => m.id === parseInt(id));  // Buscar el método de pago por ID

  if (!metodoPago) {
    return res.status(404).json({ error: 'Método de pago no encontrado' }); // Si no lo encontramos, enviamos un error
  }

  res.json(metodoPago); // Si lo encontramos, devolvemos el método de pago
};

// Agregar un nuevo método de pago
exports.agregarMetodoPago = (req, res) => {
  const { metodo, detalles } = req.body;

  // Validamos que los campos sean proporcionados
  if (!metodo || !detalles) {
    return res.status(400).json({ error: "Faltan campos requeridos: metodo y detalles" });
  }

  // Verificamos si el método de pago ya existe
  const existeMetodo = metodosPago.some(m => m.metodo.toLowerCase() === metodo.toLowerCase());
  if (existeMetodo) {
    return res.status(400).json({ error: "El método de pago ya existe" });
  }

  // Generamos un ID único para el nuevo método de pago (podría ser automático si fuera necesario)
  const nuevoMetodo = {
    id: metodosPago.length > 0 ? Math.max(...metodosPago.map(m => m.id)) + 1 : 1, // Mejor método para generar ID único
    metodo,
    detalles
  };

  // Lo agregamos a nuestra "base de datos" (el array en memoria)
  metodosPago.push(nuevoMetodo);
  res.status(201).json(nuevoMetodo);  // Respondemos con el nuevo método de pago y el código 201
};

// Actualizar un método de pago existente
exports.actualizarMetodoPago = (req, res) => {
  const { id } = req.params;
  const metodoPago = metodosPago.find(m => m.id === parseInt(id));  // Buscamos el método de pago por ID

  if (!metodoPago) {
    return res.status(404).json({ error: 'Método de pago no encontrado' }); // Si no lo encontramos, respondemos con error
  }

  // Obtenemos los nuevos valores del cuerpo de la solicitud
  const { metodo, detalles } = req.body;

  // Validamos que los campos sean proporcionados
  if (!metodo || !detalles) {
    return res.status(400).json({ error: "Faltan campos requeridos: metodo y detalles" });
  }

  // Actualizamos el método de pago con los nuevos valores
  metodoPago.metodo = metodo;
  metodoPago.detalles = detalles;

  res.json(metodoPago);  // Devolvemos el método de pago actualizado
};

// Eliminar un método de pago
exports.eliminarMetodoPago = (req, res) => {
  const { id } = req.params;
  const metodoPagoIndex = metodosPago.findIndex(m => m.id === parseInt(id));  // Buscamos el índice del método de pago a eliminar

  if (metodoPagoIndex === -1) {
    return res.status(404).json({ error: 'Método de pago no encontrado' }); // Si no lo encontramos, respondemos con error
  }

  // Eliminamos el método de pago
  metodosPago.splice(metodoPagoIndex, 1);
  res.status(204).send();  // Respondemos con un código 204 (sin contenido) para indicar que la eliminación fue exitosa
};
