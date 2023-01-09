import axiosInstance from "./axiosHandler"
class Service{
    static async list(){
        return (await axiosInstance.get('/appointment/list'))
    }

    static async changeStatus(id,status){
        return (await axiosInstance.patch('/appointment/edit/'+id,status))
    }
}

export default Service