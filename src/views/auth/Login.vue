<template>
    <section id="login">
      <div class="container">
        <div class="flex justify-center px-2 min-h-[100vh] items-center">
          <form @submit.prevent="login" class="bg-slate-100 max-w-sm w-full rounded-lg px-8 ">
            <h1 class="px-4 my-8 text-center text-2xl font-bold">Login</h1>
            <div class="w-full px-4 my-6">
              <label for="email_auth" class="text-base font-semibold tracking-wider">Email</label>
              <input type="email" id="email_auth" class="w-full p-3 mt-2 text-base rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" placeholder="Email" v-model="auth.input.email.value">
              <span class="text-red-500 text-sm">{{ auth.input.email.errmsg }}</span>
            </div>
            <div class="w-full px-4 my-6">
              <label for="password_auth" class="text-base font-semibold tracking-wider">Password</label>
              <input type="password" id="password_auth" class="w-full p-3 mt-2 text-base rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" placeholder="***" v-model="auth.input.password.value">
              <span class="text-red-500 text-sm">{{ auth.input.password.errmsg }}</span>
            </div>
            
  
            <p class="text-sm text-secondary w-full text-center">Dont have Accout? <RouterLink :to="{ name: 'Register' }" class="text-sky-500 hover:underline">Register</RouterLink></p>
            <div class="w-full px-4 mt-6 mb-8 flex justify-center">
              <button type="submit" class="bg-primary text-white px-6 py-2 rounded-md shadow-md font-semibold hover:bg-teal-400 transition duration-300">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  </style>
  
  <script setup>
  import { RouterLink } from 'vue-router';
  import { useAuthStore } from '../../stores/auth';
  import { onMounted } from 'vue';
  
  const auth = useAuthStore()
  
  const login  = () => {  
    /*
    * Check Input
    */
    if(!auth.input.password.value || auth.input.password.value.length < 7){
      auth.input.password.errmsg = 'min length 7'
    }
    else {
      auth.input.password.errmsg = ''
    }
  
    if(!auth.input.email.value){
      auth.input.email.errmsg = 'empty not allowed'
    }
    else if (!auth.validEmail(auth.input.email.value)) {
      auth.input.email.errmsg = 'Valid email required'
    }
    else {
      auth.input.email.errmsg = ''
    }

    /*
    * Send Request to Backend
    */
    if(!auth.input.email.errmsg && !auth.input.password.errmsg){
      auth.handleLogin()
    }
    else{
      alert('wrong credentials')
    }
  }
  
  </script>