import amqp from 'amqplib/callback_api'
import { Server, Socket } from 'socket.io'
import express from 'express'
import http from 'node:http'

const queueName = 'deposit_events'
let server = http.createServer(express())
let io = new Server(server, {
	cors: {
		origin: '*',
	},
})

type Clients = {
	[key: string]: Socket
}

const clients: Clients = {}

io.on('connection', (socket) => {
	const socketId = socket.id as string
	console.log('Um usuário se conectou: ', socketId)

	// Ouvir por um evento de identificação
	socket.on('identify', (clientId: string) => {
		console.log(`Cliente identificado: ${clientId}`)
		clients[clientId] = socket

		socket.on('disconnect', () => {
			console.log('Usuário desconectado', clientId)
			delete clients[clientId]
		})
	})
})

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
					const content = msg.content.toString()
					console.log(`Received message: ${content}`)
					ch.ack(msg) // Reconhece a mensagem como recebida
					const contentJson = JSON.parse(content)
					const client = clients[contentJson.clientId]
					if (client) {
						client.emit('notification', content)
					} else {
						console.log('Cliente não encontrado ou desconectado')
					}
				}
			},
			{ noAck: false },
		)
	})
})

const PORT = 3334

server.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`)
})
