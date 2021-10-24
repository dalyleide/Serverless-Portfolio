import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { verifyJwt, getToken } from '../../utils/utils'

const logger = createLogger('auth')

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const token = await getToken(event.authorizationToken)
    const decoded = verifyJwt(token)
        
    if (!decoded)
      throw new Error('User not authorized')

    return {
      principalId: token,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

