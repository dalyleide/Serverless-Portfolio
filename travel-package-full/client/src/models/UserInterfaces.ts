
export interface User {
    token: string,
    userName: string,
    email: string, 
    isAdmin: boolean 
}

export interface UserAttribute {
    Name: string,
    Value: string
}

export interface CreateUser {
    userName: string,
    email: string, 
    password: string
}

export interface UserLogin {
    email: string, 
    password: string
}


export interface UserItem {
    userName: string,
    email: string, 
    password: string, 
    createdAt: string, 
    isAdmin: boolean, 
    userId: string
}
