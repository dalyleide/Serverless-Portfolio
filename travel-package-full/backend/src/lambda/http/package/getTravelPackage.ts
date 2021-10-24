import 'source-map-support/register'

import { APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../../utils/logger'
import { TravelPackageService } from '../../../services/TravelPackageService'

const logger = createLogger('get TravelPackages')
const service = new TravelPackageService()

export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
  // Get all TravelPackage items for a current user
  logger.info('Enter GetTravelPackages')
  
  try {
    const TravelPackages = await service.getTravelPackages()
    logger.info('Success GetTravelPackages')
    logger.info('Objects', TravelPackages)
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        items: TravelPackages
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

