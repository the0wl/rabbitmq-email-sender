var amqp = require('amqplib/callback_api');
require('dotenv').config()

const user = process.env.USER || 'guest';
const password = process.env.PASS || 'guest';
const host = process.env.HOST || 'rabbit-1';
const port = process.env.PORT || '5672';

amqp.connect(`amqp://${user}:${password}@${host}:${port}/`, function(err, con) {
  if (err) throw err;

  con.createChannel(function(err, channel) {
    if (err) throw err;

    const queue = process.env.QUEUE || 'my-queue';
    const msg = process.env.MESSAGE;

    // make sure that the queue will survive a RabbitMQ node restart. This 
    // should be set in both sides.
    channel.assertQueue(queue, { durable: true });

    // Marking messages as persistent doesn't fully guarantee that a message 
    // won't be lost. The persistence guarantees aren't strong, but it's more 
    // than enough for our simple task queue. If you need a stronger guarantee 
    // then you can use https://rabbitmq.com/confirms.html
    channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });

    console.log("Sent %s", msg);
  });

  setTimeout(function() {
    con.close();
    process.exit(0);
  }, 500);
});