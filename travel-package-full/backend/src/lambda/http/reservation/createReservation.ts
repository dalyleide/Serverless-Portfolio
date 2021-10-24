import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../../utils/logger'
import { ReservationService } from '../../../services/ReservationService'

const logger = createLogger('create Reservations')
const service = new ReservationService()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Enter createReservation')
  
  try {
  
    const Reservation = await service.createReservation(event)
    logger.info('Sucess!! Reservation created: ', Reservation)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        item: Reservation
      })
    }
  } catch (error) {
    logger.error('Error creating Reservation, Error:', error)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'Error creating Reservation'})
    }
  }
}