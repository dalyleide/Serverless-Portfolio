import * as AWS  from 'aws-sdk'
import { APIGatewayProxyEvent} from 'aws-lambda'
import { TodoAccess } from '../dataLayer/TodoAccess'
import { getUserId } from "../utils/utils";


const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })
const bucketName = process.env.IMAGES_S3_BUCKET 

export class BucketServise {

    constructor(
            private readonly todoAccess = new TodoAccess()
            ) {
    }

    generateUrl(todoId:String) {
        return `https://${bucketName}.s3.amazonaws.com/${todoId}`;
    }

    async generateUploadUrl(event: APIGatewayProxyEvent){
        const todoId = event.pathParameters.todoId
        console.log('todoId', todoId)
        const userId = await getUserId(event)
        console.log('getUserId', userId)
        // Return a presigned URL to upload a file for a TODO item with the provided id
        const todo = await this.todoAccess.getTodo(todoId, userId)
        console.log('Find todo: ', todo)

        if (!todo) {
            throw new Error('Todo does not exist')
        }
        const url = getUploadUrl(todoId)
        return url;
    }
}

function getUploadUrl(todoId: string) {
    const attachmentUrl = s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: todoId,
      Expires: 300
    })
    console.log('Signed Url', attachmentUrl)
    return attachmentUrl
  }