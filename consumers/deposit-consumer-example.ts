import amqp from 'amqplib/callback_api'

const queueName = 'deposit_events'

amqp.connect('amqp://localhost', (err: any, conn: any) => {
	if (err) {
		throw err
	}

	conn.createChannel((err: any, ch: any) => {
		if (err) {
			throw err
		}

		ch.assertQueue(queueName, { durable: false })

		console.log(`Waiting for messages in ${queueName}. To exit press CTRL+C`)

		ch.consume(
			queueName,
			(msg: any) => {
				if (msg !== null) {
					console.log(`Received message: ${msg.content.toString()}`)
					ch.ack(msg) // Reconhece a mensagem como recebida
				}
			},
			{ noAck: false },
		)
	})
})
