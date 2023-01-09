import axiosInstance from "./axiosHandler"
class AuthService{
    static async login(payload){
        return (await axiosInstance.post('/auth/login',payload))
    }

    static async getProfile(){
        return (await axiosInstance.get('/user/profile'))
    }

    static async updateProfile(id,payload){
        return (await axiosInstance.patch('/user/profile/'+id,payload))
    }
}

export default AuthService