import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/v1/admin",
});

axiosInstance.interceptors.request.use(
    config=>{
        if(config.url==='/auth/login')return config
        const token=localStorage.getItem('device_token')
        config.headers['authorization']=`Bearer ${token}`
        return config
    },
    err=>{
        Promise.reject(err)
    }
)

axiosInstance.interceptors.response.use(
    response=>{
        if(response.config.url.indexOf('/auth/login')>-1){
            localStorage.setItem('device_token',response.data.data.token)
        }
        return response.data
    },
    err=>{
        console.log('err from res inter',err)
        if(err.response.status===403){
            localStorage.removeItem('device_token')
            Promise.reject(err)
        }
    }
)


export default axiosInstance