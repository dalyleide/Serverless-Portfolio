import { APIGatewayProxyEvent} from 'aws-lambda'
import * as uuid from 'uuid'
import { TodoAccess } from '../dataLayer/TodoAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { getUserId } from "../utils/utils"
import { TodoItem } from 'src/models/TodoItem'
import { createLogger } from '../utils/logger'
import { BucketServise} from './bucketService'

export class TodoService {

    constructor(
        //    private readonly docClient: DocumentClient = createDynamoDBClient(),
            private readonly logger = createLogger('Service todos'), 
            private readonly todoAccess = new TodoAccess(),  
            private readonly bucketService = new BucketServise()) {
    }

    async getTodos(event: APIGatewayProxyEvent) {
        const userId = getUserId(event)
        this.logger.info('UserId', userId)
        const todos = await this.todoAccess.getTodosPerUser(userId)
        return todos
    }

    async deleteTodo(event: APIGatewayProxyEvent) {
        const todoId = event.pathParameters.todoId
        this.logger.info('Delete todoId', todoId)
        
        const userId = getUserId(event)
        this.logger.info('UserId', userId)

        // Remove a TODO item by id
        await this.todoAccess.deleteTodo(todoId, userId)
    }

    async updateTodo(event: APIGatewayProxyEvent) {
        const todoId = event.pathParameters.todoId
        const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
        const userId = getUserId(event)


        await this.todoAccess.updateTodo(todoId, userId, updatedTodo)
    }

    async createTodo(event: APIGatewayProxyEvent) {
        const newTodo: CreateTodoRequest = JSON.parse(event.body)

        this.logger.info('Storing new item: ', newTodo)
        this.isValidNewTodo(newTodo)

        //Implement creating a new TODO item
        const userId = getUserId(event)
        this.logger.info('getUserId', userId)

        const todoId = uuid.v4()
        this.logger.info('todoId', todoId)

        const attachmentUrl = this.bucketService.generateUrl(todoId)
        this.logger.info('attachmentUrl: ', attachmentUrl)

        const todo: TodoItem = {
            ...newTodo,
            userId: userId,
            todoId: todoId,
            createdAt: new Date().toISOString(),
            done: false, 
            attachmentUrl: attachmentUrl
        }
        await this.todoAccess.createTodo(todo)
        return todo;
    }

    isValidNewTodo(newTodo: CreateTodoRequest) {
        if (!newTodo.dueDate || !newTodo.name)
        throw new Error('Bad request, you must fill all parameters')
    }

}
