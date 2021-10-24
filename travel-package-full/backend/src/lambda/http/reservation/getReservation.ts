import 'source-map-support/register'

import { APIGatewayProxyResult, APIGatewayProxyHandler, APIGatewayProxyEvent} from 'aws-lambda'
import { createLogger } from '../../../utils/logger'
import { ReservationService } from '../../../services/ReservationService'

const logger = createLogger('get TravelPackages')
const service = new ReservationService()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Get all TravelPackage items for a current user
  logger.info('Enter GetTravelPackages')
  
  try {
    const TravelPackages = await service.getReservations(event)
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