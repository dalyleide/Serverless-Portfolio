import { APIGatewayProxyEvent } from "aws-lambda";
import { createLogger } from './logger'

const logger = createLogger('auth')
const jwt = require('jsonwebtoken')

export function getUserId(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const token = split[1]
  logger.info('token: ', token)
  const decoded = jwt.verify(token, process.env.SECRET)
  logger.info('id', decoded.id)

  return decoded.id
}

export function verifyJwt(token: string) {
  const decoded = jwt.verify(token, process.env.SECRET)
  logger.info('decoded', decoded)
  logger.info('id', decoded.id)

  return decoded
}

export function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
