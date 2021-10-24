import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { TodoService } from '../../service/TodoService'

const logger = createLogger('update todos')
const service = new TodoService()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  logger.info('Enter UpdatedTodo')
  
  try {
    const todo = await service.createTodo(event)
    logger.info('Sucess!! Todo created: ', todo)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }, 
        body: JSON.stringify({message: 'Success Updated'})
      }

  } catch (error) {
    logger.error('Error updating Todo, Error:', error)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'Error updating todo'})
    }
  }
}
