import axiosInstance from "./axiosHandler"
class Service{
    static async list(){
        return (await axiosInstance.get('/booking/list'))
    }
}

export default Service