import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../../utils/logger'
import { TravelPackageService } from '../../../services/TravelPackageService'

const logger = createLogger('create Travel Package')
const service = new TravelPackageService()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Enter createTravelPackage')
  
  try {
  
    const TravelPackage = await service.createTravelPackage(event)
    logger.info('Sucess!! TravelPackage created: ', TravelPackage)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        item: TravelPackage
      })
    }
  } catch (error) {
    logger.error('Error creating TravelPackage, Error:', error)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'Error creating TravelPackage'})
    }
  }
}