import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TravelPackage } from '../models/TravelPackage'
import { createLogger } from '../utils/logger'
import { UpdateTravelPackageRequest} from "../requests/TravelPackageRequest"

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger('TravelPackageAccess')

export class TravelPackageAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly TravelPackageTable = process.env.TRAVEL_PACKAGE_TABLE) {
  }

  async createTravelPackage(travel: TravelPackage): Promise<TravelPackage> {
    try {
      await this.docClient.put({
        TableName: this.TravelPackageTable,
        Item: travel
      }).promise()  
    } catch(e) {
      logger.error('Error TravelPackage: ', e)
    }

    return travel as TravelPackage
  }

  async updateTravelPackage(travelPackageId: string, updated:UpdateTravelPackageRequest) {

    console.log('travelPackageId', travelPackageId)
    console.log('updated', updated)
    await this.docClient.update({
      TableName: this.TravelPackageTable, 
      Key: {
        travelPackageId: travelPackageId
        },
      UpdateExpression: 'set #name = :name, #location = :location, openDate = :openDate, endDate = :endDate', 
      ExpressionAttributeValues: {
          ':name': updated.name,
          ':location': updated.location,
          ':openDate': updated.openDate,
          ':endDate': updated.endDate
      },
      ExpressionAttributeNames: {
          "#name": "name",
          "#location": "location"
        }
      }).promise()
  }

  async getTravelPackage(travelPackageId: String) : Promise<TravelPackage>  {
    const result =  await this.docClient.get({
      TableName: this.TravelPackageTable,
      Key: {
        travelPackageId: travelPackageId
      } 
    }).promise()

    return result.Item as TravelPackage
  }

  async getTravelPackages() : Promise<TravelPackage[]>  {
    const result =  await this.docClient.scan({
      TableName: this.TravelPackageTable
    }).promise()

    return result.Items as TravelPackage[]
  }

  async deleteTravelPackage(travelPackageId: String) {
    await this.docClient.delete({
      TableName: this.TravelPackageTable,
      Key: {
        travelPackageId
      } 
    }).promise()
  }

  async updateUrl(travelPackageId: string, attachmentUrl: string) {
    logger.info('attachmentUrl', attachmentUrl)
    logger.info('travelPackageId', travelPackageId)
    await this.docClient.update({
      TableName: this.TravelPackageTable, 
      Key: {
        travelPackageId: travelPackageId
      }, 
      UpdateExpression: "set attachmentUrl = :attachmentUrl", 
      ExpressionAttributeValues: {
        ":attachmentUrl":attachmentUrl
      }
    }).promise()
  }
}
