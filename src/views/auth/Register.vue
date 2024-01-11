<template>
    <section id="login">
      <div class="container">
        <div class="flex justify-center px-2 min-h-[100vh] items-center">
          <form action="" class="bg-slate-100 max-w-md w-full rounded-lg px-8 " @submit.prevent="register">
            <h1 class="px-4 my-8 text-center text-2xl font-bold">Register</h1>
            <div class="w-full px-4 my-3">
              <label for="name_regis" class="text-base font-semibold tracking-wider">Name</label>
              <input type="text" id="name_regis" class="w-full p-3 mt-2 text-base rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" placeholder="Name" v-model="name">
              <span class="text-red-500 text-sm">{{ nameErrMsg }}</span>
            </div>
            <div class="w-full px-4 my-3">
              <label for="email_regis" class="text-base font-semibold tracking-wider">Email</label>
              <input type="email" id="email_regis" class="w-full p-3 mt-2 text-base rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" placeholder="Email" v-model="email">
              <span class="text-red-500 text-sm">{{ emailErrMsg }}</span>
            </div>
            <div class="w-full px-4 my-3">
              <label for="password_regis" class="text-base font-semibold tracking-wider">Password</label>
              <input type="password" id="password_regis" class="w-full p-3 mt-2 text-base rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" placeholder="***" v-model="password">
              <span class="text-red-500 text-sm">{{ passwordErrMsg }}</span>
            </div>

            <div class="w-full px-4 my-3">
              <label for="password_regis" class="text-base font-semibold tracking-wider">Role</label>
              <select  id="role_regis" class="w-full p-3 mt-2 text-base rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="role">
                <option value="" selected disabled hidden>Choose Role</option>
                <option value="1">Admin</option>
                <option value="0">User</option>
              </select>
              <!-- <input type="password" id="password_regis" class="w-full p-3 mt-2 text-base rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" placeholder="***" v-model="password">
              <span class="text-red-500 text-sm">{{ passwordErrMsg }}</span> -->
            </div>
            
            <p class="text-sm text-secondary w-full text-center">Already have account? <RouterLink :to="{ name: 'Login' }" class="text-sky-500 hover:underline">Login</RouterLink></p>
            <div class="w-full px-4 mt-6 mb-8 flex justify-center">
              <button type="submit" class="bg-primary text-white px-6 py-2 rounded-md shadow-md font-semibold hover:bg-teal-400 transition duration-300">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </section>
    
  </template>
  
  <script setup>
  import { useAuthStore } from '../../stores/auth';
  import { ref } from 'vue';
  
  const auth = useAuthStore()
  
  let name = ref('')
  let nameErrMsg = ref('')
  let email = ref('')
  let emailErrMsg = ref('')
  let password = ref('')
  let passwordErrMsg = ref('')
  let role = ref('')
  
  const register = () => {
    /*
    * Check Input
    */
    // check name input  
    if(!name.value){
      nameErrMsg.value = 'empty not allowed'
    }
    else{
      nameErrMsg.value = ''
    }
    // check email input  
    if(!email.value){
      emailErrMsg.value = 'empty not allowed'
    }
    else if(!auth.validEmail(email.value)) {
      emailErrMsg.value = 'valid email required'
    }
    else{
      emailErrMsg.value = ''
    }
    // check password input
    if(!password.value){
      passwordErrMsg.value = 'empty not allowed'
    }
    else{
      passwordErrMsg.value = ''
    }
  
    /*
    * Send Request to Background
    */
    if(!nameErrMsg.value && !emailErrMsg.value && !passwordErrMsg.value){
      auth.handleRegister(name.value, email.value, password.value, role.value)
    }
    else{
      alert('correct the input')
    }
  }
  </script>