import axiosInstance from "./axiosHandler"
class Service{
    static async list(){
        return (await axiosInstance.get('/venue/list'))
    }

    static async create(payload){
        return (await axiosInstance.post('/venue/create',payload))
    }

    static async edit(id,payload){
        return (await axiosInstance.patch('/venue/edit/'+id,payload))
    }

    static async remove(id){
        return (await axiosInstance.delete('/venue/delete/'+id))
    }
}

export default Service