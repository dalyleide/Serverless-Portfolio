export interface CreateUser {
    userName: string,
    email: string, 
    password: string
}

export interface UserLogin {
    email: string, 
    password: string
}