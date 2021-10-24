import { CreateUser, User, UserAttribute, UserItem, UserLogin } from "../models/UserInterfaces";
import { createUser, login } from "../api/user-api"

export class AuthService{

    public async login(email: string, password: string):Promise<User | undefined>{

        try {

            const user: UserLogin = {
                email: email, 
                password: password
            }

            const result = login(user)
            return result
        } catch (error) {
            return undefined
        }
    }

    public async createUser(userName:string, email: string, password: string):Promise<UserItem | undefined>{

        try {

            const user: CreateUser = {
                email: email, 
                password: password, 
                userName: userName
            }

            const result = createUser(user)
            return result
        } catch (error) {
            return undefined
        }
    }

    public async getUserAttibutes(user: User): Promise<UserAttribute[]> {

        const result : UserAttribute[] = []
        result.push({
            Name: 'description', 
            Value: 'Value description'
        })
        result.push({
            Name: 'description 01', 
            Value: 'Value description 01'
        })
        result.push({
            Name: 'description 02', 
            Value: 'Value description 02'
        })
        result.push({
            Name: 'description 03', 
            Value: 'Value description 03'
        })
        return result
    }
}