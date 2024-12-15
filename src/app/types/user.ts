export interface ILogin {
    type?: "login"
    email: string,
    password: string
}

export interface IRegister {
    type?: "register"
    username: string,
    email: string,
    password: string
}

