var amqp = require('amqplib/callback_api');

const user = 'guest';
const password = 'guest';
const host = 'rabbit-1';
const port = '5672';

amqp.connect(`amqp://${user}:${password}@${host}:${port}/`, function(err, con) {
  if (err) throw err;

  con.createChannel(function(err, channel) {
    if (err) throw err;

    const queue = 'my-queue';
    const msg = 'Hello world';

    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log("Sent %s", msg);
  });

  setTimeout(function() {
    con.close();
    process.exit(0);
  }, 500);
});