import axiosInstance from "./axiosHandler"
class Service{
    static async getData(){
        return (await axiosInstance.get('/dashboard/data'))
    }
}

export default Service