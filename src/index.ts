export type Roles = "ADMIN" | "USER"

export interface AuthSchema{
    email: string
    password: string
}

export type User = {
    id?: number
    name: string
    email: string
    password: string
    role: Roles
}


export type UserLogin = {
    id?: number
    name: string
    email: string
    role: Roles
    token: string
}


export interface UserPayload{
    id: number
    name: string
    email: string
    role: Roles
}

