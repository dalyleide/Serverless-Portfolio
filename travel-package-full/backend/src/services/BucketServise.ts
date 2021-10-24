import * as AWS  from 'aws-sdk'
import { APIGatewayProxyEvent} from 'aws-lambda'
import { TravelPackageAccess } from '../dataLayer/TravelPackageAccess'
import { createLogger } from '../utils/logger'
const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })
const bucketName = process.env.IMAGES_S3_BUCKET 

export class BucketServise {

    constructor(
            private readonly access = new TravelPackageAccess(), 
            private readonly logger = createLogger('Service Bucket')
            ) {
    }

    private generateUrl(travelPackageId:String) {
        return `https://${bucketName}.s3.amazonaws.com/${travelPackageId}`;
    }

    async generateUploadUrl(event: APIGatewayProxyEvent){
        const travelPackageId = event.pathParameters.travelPackageId
        this.logger.info('travelPackageId', travelPackageId)
        // Return a presigned URL to upload a file for a TODO item with the provided id
        const todo = await this.access.getTravelPackage(travelPackageId)
        this.logger.info('Find travelPackageId: ', todo)

        if (!todo) {
            throw new Error('Todo does not exist')
        }
        const url = getUploadUrl(travelPackageId)

        this.logger.info('UploadUrl:'+url)
        await this.access.updateUrl(travelPackageId, this.generateUrl(travelPackageId))

        return url;
    }
}

function getUploadUrl(travelPackageId: string) {
    const attachmentUrl = s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: travelPackageId,
      Expires: 300
    })
    console.log('Signed Url', attachmentUrl)
    return attachmentUrl
  }