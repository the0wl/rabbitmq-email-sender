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

		channel.assertQueue(queue, { durable: false });

		console.log(" [*] Waiting for messages in %s. In 15 seconds the receiver will be cancelled.", queue);

		channel.consume(queue, function(msg) {
			console.log("Received %s", msg.content.toString());
		}, {
			noAck: true
		});
	});

	setTimeout(function() {
    con.close();
    process.exit(0);
  }, 60000);
});