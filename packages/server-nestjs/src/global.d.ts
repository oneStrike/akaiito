/* eslint-disable */
import type { FastifyRequest } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user?: any
  }
}
