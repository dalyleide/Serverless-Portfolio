import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../../utils/logger'
import { TravelPackageService } from '../../../services/TravelPackageService'


const logger = createLogger('delete TravelPackages')
const service = new TravelPackageService()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Enter deleteTravelPackage')
  
  try {
    await service.deleteTravelPackage(event)
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'TravelPackage was deleted'})
    }
  } catch (error) {
    logger.error('Error deleting TravelPackage, Error:', error)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'Error deleting TravelPackage'})
    }
  }
}
