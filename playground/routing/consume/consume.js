const amqp = require('amqplib/callback_api');
require('dotenv').config()

const user = process.env.USER || 'guest';
const password = process.env.PASS || 'guest';
const host = process.env.HOST || 'rabbit-1';
const port = process.env.PORT || '5672';
const noAck = process.env.NOACK === 'true';
const routingKey = process.env.ROUTE || 'info';

amqp.connect(`amqp://${user}:${password}@${host}:${port}/`, function(err, con) {
  if (err) throw err;

  con.createChannel(function(err, channel) {
    if (err) throw err;

    const exchange = 'direct_logs';

    channel.assertExchange(exchange, 'direct', { durable: false });

    // Empty string means a queue with a random name
    // With exclusive the queue will be deleted when the connection is closed
    channel.assertQueue('', { exclusive: true }, function(err, queueRef) {
      if (err) throw err;

      console.log(" [*] Waiting for messages in %s", queueRef.queue);
      
      channel.bindQueue(queueRef.queue, exchange, routingKey);

      channel.consume(queueRef.queue, function(msg) {
        if (msg.content) { 
          console.log(" [x] %s: '%s'", 
            msg.fields.routingKey, 
            msg.content.toString()) 
        }
        
        if (!noAck) { channel.ack(msg) }
      }, { noAck });
    });
  });

  setTimeout(function() {
    con.close();
    process.exit(0);
  }, 30000);
});