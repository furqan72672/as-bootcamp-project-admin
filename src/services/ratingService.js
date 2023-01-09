import axiosInstance from "./axiosHandler"
class Service{
    static async list(){
        return (await axiosInstance.get('/rating/list'))
    }

    static async remove(id){
        return (await axiosInstance.delete('/rating/delete/'+id))
    }
}

export default Service