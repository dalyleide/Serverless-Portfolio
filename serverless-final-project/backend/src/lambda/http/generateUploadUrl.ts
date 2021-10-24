import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { BucketServise } from '../../service/bucketService'

const logger = createLogger('generateUrl todos')
const service = new BucketServise()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Enter GenerateUploadUrl')
  try {
    const url = await service.generateUploadUrl(event);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        uploadUrl: url
      })
    } 
  } catch (error) {
    logger.error('Error Generating Upload Url, Error:', error)
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

