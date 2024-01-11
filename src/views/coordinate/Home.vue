<template>
    <div class="w-full mb-6 py-4 text-2xl font-bold text-center">
        <h1>Simple Map</h1>
    </div>
    <form action="" class="p-4" @submit.prevent="submitForm">
        <div class="mb-6 md:flex">
            <div class="mb-6 md:w-1/2 mx-auto">
                <div class="mb-2">
                    <label for="" class="text-base">Longitude Asal</label>
                    <input type="number" step="0.001" class="w-full px-4 py-2 mt-2 border-2 rounded-sm focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="coor.s_longitude">
                </div>
                <div class="mb-2">
                    <label for="" class="text-base">Latitude Asal</label>
                    <input type="number" step="0.001" class="w-full px-4 py-2 mt-2 border-2 rounded-sm focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="coor.s_latitude">
                </div>
                <div class="mb-2">
                    <label for="" class="text-base">Longitude Tujuan</label>
                    <input type="number" step="0.001" class="w-full px-4 py-2 mt-2 border-2 rounded-sm focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="coor.d_longitude">
                </div>
                <div class="mb-2">
                    <label for="" class="text-base">Latitude Tujuan</label>
                    <input type="number" step="0.001" class="w-full px-4 py-2 mt-2 border-2 rounded-sm focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="coor.d_latitude">
                </div>
                <div class="mb-2">
                    <label for="" class="text-base">Description</label>
                    <input type="text" class="w-full px-4 py-2 mt-2 border-2 rounded-sm focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="coor.description">
                </div>
            </div>
        </div>

        <div class="max-w-lg mx-auto">
            <button type="submit" class="bg-primary text-white w-full py-2 rounded-sm">Masukkan</button>
        </div>
    </form>

    <div v-if="showMap">
        <Map 
            :s_longitude="coor.s_longitude"
            :s_latitude="coor.s_latitude"
            :d_longitude="coor.d_longitude"
            :d_latitude="coor.d_latitude"
            >
        </Map>
    </div>
    <div id="map" class="w-1/2 h-[400px] mx-auto mb-10">

    </div>
</template>

<script setup>
import Map from '@/components/Map.vue'
import { useCoordinateStore } from '../../stores/coordinate';
import { ref } from "vue";

const coor = useCoordinateStore()

let showMap = ref(false)

const submitForm = () => {
    if(!coor.s_longitude || !coor.s_latitude || !coor.d_longitude || !coor.d_latitude || !coor.description){
        alert('Input tidak boleh kosong!')
        return
    }
    coor.createCoordinate()

    if(showMap.value){
        showMap.value = false
    }
    showMap.value = true
}
</script>