import express from 'express'
import { sendEventToRabbitMQ } from './connect-rabbitmq'

const expressApp = express()

expressApp.use(express.json())

expressApp.post('/deposit', async (request, response) => {
	const body: DepositDTO = request.body

	console.log(body)

	// Store on database

	// Send event to rabbitmq

	await sendEventToRabbitMQ('deposit_events', body)

	console.log(
		`Cliente ${body.clientId} depositou ${body.amount.toLocaleString('pt-BR', {
			currency: 'brl',
			style: 'currency',
		})}`,
	)

	return response.status(204).send()
})

const PORT = 3333

expressApp.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

type DepositDTO = {
	clientId: string
	amount: number
}
