import { apiEndpoint } from '../config'
import { CreateUser, UserLogin, UserItem, User} from '../models/UserInterfaces';
import Axios from 'axios'

export async function createUser(newUser: CreateUser): Promise<UserItem> {
  const response = await Axios.post(`${apiEndpoint}/user`,  JSON.stringify(newUser), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data.item
}

export async function login(userLogin: UserLogin): Promise<User> {
  const response = await Axios.post(`${apiEndpoint}/login`,  JSON.stringify(userLogin), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(response.data)
  return response.data as User
}