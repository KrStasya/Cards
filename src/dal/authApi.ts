import axios from "axios";

const instance = axios.create({
   baseURL: "https://neko-back.herokuapp.com/2.0/",
   // baseURL: "http://localhost:7542/2.0/",
   withCredentials: true
})

export const authApi = {
   me() {
      return instance.post('auth/me')
   },
   login(data: LoginDataT) {
      return instance.post<ResponseUserDataT>('auth/login', data)
   },
   logOut() {
      return instance.delete('auth/me')
   },
   signUp(data: { email: string, password: string }) {
      return instance.post<newUserApiType>('auth/register', data)
   },
   setNewPassword(data: { password: string, resetPasswordToken: string }) {
      return instance.post('auth/set-new-password', data)
   },
   forgotPassword(email: string) {
      return instance.post('auth/forgot', {
         email,
         message: `
         <div style="background-color: lime; padding: 15px">
            Password recovery link:
             <a href='https://mr-g3ntl3man.github.io/Friday/#/set-new-password/$token$'>Link</a>
         </div> `
      })
   },
}
//
export type ResponseUserDataT = {
   created: string
   email: string
   isAdmin: boolean
   name: string
   publicCardPacksCount: number
   rememberMe: boolean
   token: string
   tokenDeathTime: number
   updated: string
   verified: boolean
   __v: number
   _id: string
}

export type LoginDataT = {
   email: string,
   password: string
   rememberMe: boolean
}

export type newUserApiType = {
   addedUser: {}
   error: string
}

		