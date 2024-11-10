// models/metodo-pago.js
const metodosPago = [
    {
      id: 1,
      usuarioId: 1,
      tipo: 'Tarjeta de Crédito',
      detalles: {
        numero: '1234 5678 9876 5432',
        expiracion: '12/25',
        cvv: '123',
      },
    },
    {
      id: 2,
      usuarioId: 2,
      tipo: 'PayPal',
      detalles: {
        email: 'ana.paypal@email.com',
      },
    },
    // Agregar más métodos de pago aquí...
  ];
  
  module.exports = metodosPago;
  