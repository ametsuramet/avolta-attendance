export interface LoginReq {
    email: string
    password: string
    fcmToken: string
    device: string
}


export interface Profile {
    full_name: string
    employee_name: string
    employee_id: string
    picture: string
    email: string
    role_name: string
}