
import { APIGatewayProxyEvent} from 'aws-lambda'
import { UserAccess } from '../dataLayer/UserAccess'
import { createLogger } from '../utils/logger'
import { CreateUser, UserLogin} from '../requests/UserRequest'
import { User } from '../models/User'
import * as uuid from 'uuid'

export class UserService {

    constructor(
        private readonly logger = createLogger('Service User'), 
        private readonly access = new UserAccess()) {
    }

    async createUser(event: APIGatewayProxyEvent) {
        this.logger.info('event: ', event)
        this.logger.info('body: ', event.body)

        const newUser: CreateUser = JSON.parse(event.body)
        this.logger.info('newUser: ', newUser)
        validateNewAtts(newUser)

        const userId = uuid.v4()

        const user: User = {
            ...newUser,
            createdAt: new Date().toISOString(), 
            isAdmin: false, 
            userId: userId
        }
        await this.access.createUser(user)
        return user;
    }

    async login(event: APIGatewayProxyEvent):Promise<User> {
        const login: UserLogin = JSON.parse(event.body)
        validateLoginAtts(login)
        const users = await this.access.getUser(login.email)
        this.logger.info('users: ', users)
        const user = users[0]
        this.logger.info('user: ', user)
        if (user.password === login.password)
            return user as User
        else 
            throw 'Invalid User or Password'
    }
}

function validateLoginAtts(updated:UserLogin):void {

    if (!updated.password)
        throw Error('Password can not to be NULL')
    if (!updated.email)
        throw Error('Email can not to be NULL')
}

function validateNewAtts(newObject:CreateUser):void {

    if (!newObject.email)
        throw Error('Email can not to be NULL')
    if (!newObject.password)
        throw Error('Password can not to be NULL')
    if (!newObject.userName)
        throw Error('Name can not to be NULL')
}