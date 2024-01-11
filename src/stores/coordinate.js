import { defineStore } from "pinia";
import axiosInstance from "../lib/";
import router from '../router'

export const useCoordinateStore = defineStore('coordinate', {
    state: () => ({
        coordinates: [],
        s_longitude: null,
        s_latitude: null,
        d_longitude: null,
        d_latitude: null,
        description: '',

        edit_s_longitude: null,
        edit_s_latitude: null,
        edit_d_longitude: null,
        edit_d_latitude: null,
        editDescription: '',
    }),
    actions: {
        async getCoordinateDetail(id){
            await axiosInstance.get(`/coordinate/${id}`)
                    .then(res=>res.data)
                    .then(data=>{
                        this.edit_s_longitude = data.data.s_longitude
                        this.edit_s_latitude = data.data.s_latitude
                        this.edit_d_longitude = data.data.d_longitude
                        this.edit_d_latitude = data.data.d_latitude
                        this.editDescription = data.data.description
                    })
                    .catch(err => {
                        console.log(err)
                    })
        },
        async getCoordinateList(){
            await axiosInstance.get('/coordinate')
                    .then(res => res.data)
                    .then(data => {
                        this.coordinates = data.data
                    })
                    .catch(err => {
                        alert(err.response.data.message)
                    })
        },
        async createCoordinate(){
            await axiosInstance.post('/coordinate', {
                s_longitude: this.s_longitude,
                s_latitude: this.s_latitude,
                d_longitude: this.d_longitude,
                d_latitude: this.d_latitude,
                description: this.description
            })
            .then(res => res.data)
            .then(data => {
                // window.location.reload();
            })
            .catch(err => {
                alert(err.response.data.message)
            })
        },
        async editCoordinate(id, objData){
            await axiosInstance.put(`/coordinate/${id}`, objData)
                .then(res => res.data)
                .then(data => {
                    if(data.error){
                        alert(data.error.message)
                    }
                    else{
                        router.push({ name: 'List' })
                    }
                })
                .catch(err => {
                    alert(err.response.data.message)
                })
        },
        async deleteCoordinate(id){
            if(confirm('Yakin ingin menghapus produk?')){
                await axiosInstance.delete(`/coordinate/${id}`)
                    .then(res => res.data)
                    .then(data => {
                        router.go(0)
                    })
                    .catch(err => {
                        alert(err.response.data.message)
                    })
            }
        }
    }
})