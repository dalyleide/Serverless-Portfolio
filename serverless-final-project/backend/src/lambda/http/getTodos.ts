import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { TodoService } from '../../service/TodoService'

const logger = createLogger('get todos')
const service = new TodoService()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Get all TODO items for a current user
  logger.info('Enter GetTodos')
  
  try {
    const todos = await service.getTodos(event)
    logger.info('Success GetTodos')
    logger.info('Objects', todos)
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        items: todos
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

