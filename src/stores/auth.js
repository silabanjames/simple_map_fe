import { defineStore } from "pinia";
import axiosInstance from "../lib/";
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () =>({
        input: {
            email: {
                value: '',
                errmsg: ''
            },
            password: {
                value: '',
                errmsg: ''
            },
        },
        user: {
            name: sessionStorage.getItem('name'),
            email: sessionStorage.getItem('email'),
            role: sessionStorage.getItem('role'),
        }
    }),
    actions: {
        async handleLogin() {
            const email = this.input.email.value
            const password = this.input.password.value
            await axiosInstance.post('/auth/login', {
                email,
                password
            })
            .then(res => res.data)
            .then(
                data => {
                    const token = data.access_token
                    sessionStorage.setItem('token', token)
                    sessionStorage.setItem('name', data.user_information.name)
                    sessionStorage.setItem('email', data.user_information.email)
                    sessionStorage.setItem('role', data.user_information.role)
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    this.user.name = sessionStorage.getItem('name')
                    this.user.email = sessionStorage.getItem('email')
                    this.user.role = sessionStorage.getItem('role')
                    this.input.email.errmsg = ''
                    this.input.password.value = ''
                    this.input.password.errmsg = ''
                    router.push({name: 'Home'})
                }
            )
            .catch(err => {
                console.log(err.response)
                alert(err.response.data.message)
            })
        },
        async handleRegister(name, email, password, role){
            await axiosInstance.post('/auth/register', {
                name,
                email,
                password,
                role: parseInt(role)
            })
            .then(res => res.data)
            .then(
                router.push({name: 'Login'})
            )
            .catch(err=> {
                alert(err.response.data.message)
            })
        },
        handleLogout(){
            let confirmation = confirm("Apakah anda yakin ingin keluar dari aplikasi?")
            if(confirmation){
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('id')
                sessionStorage.removeItem('name')
                sessionStorage.removeItem('email')
                sessionStorage.removeItem('role')
                router.push({name: 'Login'})
            }
        },
        validEmail(email){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)
        }
    }
})