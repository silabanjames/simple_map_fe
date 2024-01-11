<template>
    <div class="border py-4">
        <Header></Header>
    </div>
    
    <!-- <div class="md:pl-[90px]"> -->
    <div>
        <RouterView />
    </div>
    
    </template>
    
    <script setup>
    import Header from './header.vue'
    // import { RouterLink } from 'vue-router';
    
    </script>