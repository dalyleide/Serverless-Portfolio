import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { TodoService } from '../../service/TodoService'

const logger = createLogger('create todos')
const service = new TodoService()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Enter createTodo')
  
  try {
  
    const todo = await service.createTodo(event)
    logger.info('Sucess!! Todo created: ', todo)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        item: todo
      })
    }
  } catch (error) {
    logger.error('Error creating Todo, Error:', error)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'Error creating todo'})
    }
  }
}