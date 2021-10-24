import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

export class TodoAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly TodosTable = process.env.TODO_TABLE) {
  }

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    try {
      await this.docClient.put({
        TableName: this.TodosTable,
        Item: todo
      }).promise()  
    } catch(e) {
      console.log('Error CreateTodo: ', e)
    }
    
    return todo as TodoItem
  }

  async updateTodo(todoId: String, userId:String, updatedTodo:TodoUpdate) {
    await this.docClient.update({
      TableName: this.TodosTable, 
      Key: {
          todoId, 
          userId
        },
        UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done', 
        ExpressionAttributeValues: {
          ':name': updatedTodo.name,
          ':dueDate': updatedTodo.dueDate,
          ':done': updatedTodo.done
        },
        ExpressionAttributeNames: {
          "#name": "name"
        }
      }).promise()
  }

  async getTodo(todoId: String, userId: String) : Promise<TodoItem>  {
    const result =  await this.docClient.get({
      TableName: this.TodosTable,
      Key: {
        todoId: todoId, 
        userId: userId
      } 
    }).promise()

    return result.Item as TodoItem
  }

  async deleteTodo(todoId: String, userId: String) {
    await this.docClient.delete({
      TableName: this.TodosTable,
      Key: {
        todoId, 
        userId
      } 
    }).promise()
  }
  
  async getTodosPerUser(userId: string) {
    const newItem = await this.docClient.query({
      TableName: this.TodosTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
         ':userId': userId
       } }).promise()
    const result = newItem.Items
    return result as TodoItem[]
  }

  async updateUrl(attachmentUrl: string, todoId: string ,userId: string) {
    await this.docClient.update({
      TableName: this.TodosTable, 
      Key: {
        todoId, userId
      }, 
      UpdateExpression: "set attachmentUrl = :attachmentUrl", 
      ExpressionAttributeValues: {
        ":attachmentUrl":attachmentUrl
      }
    }).promise()
  }
}
