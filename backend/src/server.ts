import Fastify from 'fastify'
import { prisma } from './lib/prisma.js'

const app = Fastify({ logger: true })

app.get('/api/health', async () => {
  return { status: 'ok' }
}) // health check endpoint

app.get('/api/topics', async () => {
  return prisma.topic.findMany()
}) // endpoint to get all topics

app.post<{ Body: { title: string; body: string } }>(
  '/api/topics',
  {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'body'],
        additionalProperties: false,
        properties: {
          title: { type: 'string', minLength: 1 },
          body: { type: 'string', minLength: 1 },
        },
      },
    },
  },
  async (request, reply) => {
    const { title, body } = request.body
    const topic = await prisma.topic.create({ data: { title, body } })
    return reply.code(201).send(topic)
    }, // Save the topic and return it
) // Register the topic creation endpoint

app.listen({ port: 3000, host: '127.0.0.1' }).catch((error) => {
  app.log.error(error)
  process.exit(1)
}) // Start the server; log the error and exit if startup fails