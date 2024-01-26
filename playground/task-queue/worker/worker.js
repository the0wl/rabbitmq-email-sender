var amqp = require('amqplib/callback_api');
require('dotenv').config()

const user = process.env.USER || 'guest';
const password = process.env.PASS || 'guest';
const host = process.env.HOST || 'rabbit-1';
const port = process.env.PORT || '5672';
const doPrefetch = process.env.PREFETCH === 'true';
const noAck = process.env.NOACK === 'true';

amqp.connect(`amqp://${user}:${password}@${host}:${port}/`, function(err, con) {
	if (err) throw err;

	con.createChannel(function(err, channel) {
		if (err) throw err;

		const queue = process.env.QUEUE || 'my-queue';

		// make sure that the queue will survive a RabbitMQ node restart. This 
    // should be set in both sides.
    channel.assertQueue(queue, { durable: true });

		// In a situation with two workers, when all odd messages are heavy and even
		// messages are light, one worker will be constantly busy and the other one 
		// will do hardly any work.
		
		if (doPrefetch) { 
			// Tells RabbitMQ not to give more than one message to a worker at a time.
			channel.prefetch(1);
		}

		channel.consume(queue, function(msg) {
			console.log(` [x] Received ${msg.content.toString()}`);
			
			setTimeout(function() { 
				console.log(` [x] Done`);

				if (!noAck) {
					// Manual consumer acknowledgment
					channel.ack(msg)	
				}
			}, 5000);
		}, {
			noAck
		});
	});

	setTimeout(function() {
    con.close();
    process.exit(0);
  }, 60000);
});