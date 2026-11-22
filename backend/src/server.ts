import Fastify from 'fastify'
import { prisma } from './lib/prisma.js'

const app = Fastify({ logger: true })
const publicOrigin = process.env.PUBLIC_ORIGIN

app.addHook('onRequest', async (request, reply) => {
  if (publicOrigin && request.headers.origin === publicOrigin) {
    reply.header('Access-Control-Allow-Origin', publicOrigin)
    reply.header('Vary', 'Origin')
    reply.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    reply.header('Access-Control-Allow-Headers', 'Content-Type')
  }
})

app.options('/api/topics', async (_request, reply) => reply.code(204).send())

app.get('/api/health', async () => {
  return { status: 'ok' }
}) // health check endpoint

app.get('/api/topics', async () => {
  return prisma.topic.findMany()
}) // endpoint to get all topics

app.post<{ Body: { title: string } }>(
  '/api/topics',
  {
    schema: {
      body: {
        type: 'object',
        required: ['title'],
        additionalProperties: false,
        properties: {
          title: { type: 'string', minLength: 1 },
        },
      },
    },
  },
  async (request, reply) => {
    const { title } = request.body
    const topic = await prisma.topic.create({ data: { title } })
    return reply.code(201).send(topic)
  }, // Save the topic and return it
) // Register the topic creation endpoint

app.listen({
  port: Number(process.env.PORT ?? 3000),
  host: process.env.HOST ?? '127.0.0.1',
}).catch((error) => {
  app.log.error(error)
  process.exit(1)
}) // Start the server; log the error and exit if startup fails
