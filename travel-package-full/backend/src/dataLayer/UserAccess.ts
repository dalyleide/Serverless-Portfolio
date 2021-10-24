import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { User } from '../models/User'
import { createLogger } from '../utils/logger'

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger('UserAccess')

export class UserAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly UserTable = process.env.USER_TABLE) {
  }

  async createUser(user: User): Promise<User> {
    try {
      await this.docClient.put({
        TableName: this.UserTable,
        Item: user
      }).promise()  
    } catch(e) {
      logger.error('Error User: ', e)
    }
    return user as User
  }

  async getUser(email: String) : Promise<User[]>  {
    const newItem = await this.docClient.query({
      TableName: this.UserTable,
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
         ':email': email
       } }).promise()
    const result = newItem.Items
    return result as User[]
  }
}
