import * as amqp from 'amqplib'

type MessageDTO<T> = T

export async function sendEventToRabbitMQ<T>(
	queueName: string,
	message: MessageDTO<T>,
): Promise<void> {
	try {
		const connection = await amqp.connect('amqp://localhost')
		const channel = await connection.createChannel()

		await channel.assertQueue(queueName, { durable: false })

		const content = Buffer.from(JSON.stringify(message))

		channel.sendToQueue(queueName, content)

		console.log(`Sent event to RabbitMQ: ${JSON.stringify(message)}`)

		setTimeout(() => {
			connection.close()
		}, 500)
	} catch (error) {
		console.error(error)
	}
}
