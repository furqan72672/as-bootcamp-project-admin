import axiosInstance from "./axiosHandler"
class Service{
    static async list(){
        return (await axiosInstance.get('/office/list'))
    }

    static async create(payload){
        return (await axiosInstance.post('/office/create',payload))
    }

    static async edit(id,payload){
        const res= (await axiosInstance.patch('/office/edit/'+id,payload))
        console.log(res);
    }

    static async remove(id){
        return (await axiosInstance.delete('/office/delete/'+id))
    }
}

export default Service