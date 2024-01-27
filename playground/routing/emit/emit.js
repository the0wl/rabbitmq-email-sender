var amqp = require('amqplib/callback_api');
require('dotenv').config()

const user = process.env.USER || 'guest';
const password = process.env.PASS || 'guest';
const host = process.env.HOST || 'rabbit-1';
const port = process.env.PORT || '5672';
const routingKey = process.env.ROUTE || 'info';

amqp.connect(`amqp://${user}:${password}@${host}:${port}/`, function(err, con) {
  if (err) throw err;

  con.createChannel(function(err, channel) {
    if (err) throw err;
    
    const exchange = 'direct_logs';
    const msg = process.env.MESSAGE || 'Mensagem padrão';

    channel.assertExchange(exchange, 'direct', { durable: false });

    channel.publish(exchange, routingKey, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function() {
    con.close();
    process.exit(0);
  }, 500);
});