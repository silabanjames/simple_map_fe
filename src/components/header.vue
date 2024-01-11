<template>
    <div class="flex justify-between bg-transparent z-10 relative">
        <div class="flex px-10">
            <RouterLink :to="{name: 'Home'}" class="pr-4">
                <div class="px-4 py-4 rounded-lg hover:bg-primary hover:text-white">
                Home
                </div>
            </RouterLink>
            <RouterLink :to="{name: 'List'}" v-if="auth.user.role === 'true'">
                <div class="px-4 py-4 rounded-lg hover:bg-primary hover:text-white">
                List
                </div>
            </RouterLink>
        </div>
        <div class="flex px-10">
            <RouterLink :to="{name: 'Login'}">
                <div class="px-4 py-4 rounded-lg hover:bg-primary hover:text-white" @click="auth.handleLogout">
                Logout
                </div>
            </RouterLink>
        </div>
        <div class="text-center absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
            Hello, <span class="text-lg font-bold">{{ username }}</span>
        </div>
    </div>

</template>

<script setup>
import { onMounted } from 'vue';
// import { useMenuStore } from '@/stores/menu';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore()

const username = sessionStorage.getItem("name")


</script>