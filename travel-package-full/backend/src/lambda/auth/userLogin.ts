import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { UserService } from '../../services/UserService'

const logger = createLogger('User login')
const service = new UserService()
const jwt = require('jsonwebtoken')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Enter createUser')
  
  try {
    const user = await service.login(event)
    logger.info('Login Sucess!!', user)
    const id = user.userId
    const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3000000
      });
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        token: token, 
        userName: user.userName, 
        email: user.email, 
        isAdmin: user.isAdmin 
      })
    }
  } catch (error) {
    logger.error('User not authorized', { error: error.message })
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'User not authorized' +error })
    }
  }
}