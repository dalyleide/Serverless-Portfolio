import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { ReservationItem } from '../models/Reservation'
import { createLogger } from '../utils/logger'

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger('ReservationAccess')

export class ReservationAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly reservationsTable = process.env.RESERVATION_TABLE) {
  }

  async createReservation(reservation: ReservationItem): Promise<ReservationItem> {
    logger.log('new reservation: ', reservation)
    try {
      await this.docClient.put({
        TableName: this.reservationsTable,
        Item: reservation
      }).promise()  
    } catch(e) {
      logger.error('Error ReservationItem: ', e)
    }

    return reservation as ReservationItem
  }

  async getReservation(reservationId: String, userId: String) : Promise<ReservationItem>  {
    const result =  await this.docClient.get({
      TableName: this.reservationsTable,
      Key: {
        reservationId: reservationId, 
        userId: userId
      } 
    }).promise()

    return result.Item as ReservationItem
  }

  async deleteReservation(reservationId: String, userId: String) {
    logger.log('reservationId', reservationId)
    logger.log('userId', userId)
    await this.docClient.delete({
      TableName: this.reservationsTable,
      Key: {
        reservationId: reservationId, 
        userId: userId
      } 
    }).promise()
  }
  
  async getReservationsPerUser(userId: string) {
    const newItem = await this.docClient.query({
      TableName: this.reservationsTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
         ':userId': userId
       } }).promise()
    const result = newItem.Items
    return result as ReservationItem[]
  }
}
