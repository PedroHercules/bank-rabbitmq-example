# RabbitMQ Event-Driven Learning Project 🐰🚀

Welcome to our RabbitMQ Event-Driven Learning Project This repository is designed to help you explore and gain hands-on experience with event-driven architectures using RabbitMQ. Dive into the world of message publishing, consumption, routing, and much more.

## Overview

Our project aims to demystify the complexities of event-driven systems, particularly focusing on asynchronous communication between services facilitated by RabbitMQ. Whether you're new to messaging, queues, or seeking to enhance your understanding of system integration, this project is tailored to meet your learning objectives.

## What's Inside?

### Practical Examples

Embark on a journey of discovery with our practical examples. These examples guide you through setting up and utilizing RabbitMQ for sending and receiving messages, providing a solid foundation for your learning journey.

### Comprehensive Documentation

Each example is accompanied by detailed documentation. Learn about the purpose of the code, how to execute it, and what outcomes to anticipate. Our goal is to equip you with the knowledge and skills needed to navigate the world of RabbitMQ effectively.

## Quick Start Guide

Ensure you have RabbitMQ installed on your machine. Follow these steps to get started:

### Set Up RabbitMQ

Utilize Docker Compose to spin up a RabbitMQ server container effortlessly.

```shell
cd rabbitmq && docker compose up -d
```

### Deploying the Deposit Server

1. **Install Dependencies**

   Choose your package manager:
   
   ```shell
   npm install
   ```
   or
   
   ```shell
   yarn
   ```
   or
   
   ```shell
   pnpm install
   ```

2. **Start the Deposit Service Server**

   ```shell
   npm run dev
   ```
   or
   
   ```shell
   yarn dev
   ```
   or
   
   ```shell
   pnpm run dev
   ```

### Running the Deposit Consumer Example

1. **Install Dependencies**

   Similar to deploying the server, choose your preferred package manager.

2. **Execute the Consumer**

   Listen to deposit events with the following command:

   ```shell
   npm run dev:consumer:deposit
   ```
   or
   
   ```shell
   yarn dev:consumer:deposit
   ```
   or
   
   ```shell
   pnpm run dev:consumer:deposit
   ```

### Triggering a Deposit Event

Engage with the deposit service via an HTTP POST request. Use tools like Postman or Insomnia to send a deposit request to the `/deposit` endpoint:

```json
POST /deposit
{
  "clientId": "client1",
  "amount": 1000
}
```

Monitor the logs of the deposit consumer server to observe the processing of your deposit event.
![Exemplo consumidor](consumer-example.png)
