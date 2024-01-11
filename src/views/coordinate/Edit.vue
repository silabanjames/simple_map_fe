<template>
    <div class="w-full mb-6 py-4 text-2xl font-bold text-center">
        <h1>Edit Map</h1>
    </div>
    <form action="" class="p-4" @submit.prevent="submitForm">
        <div class="mb-6 md:flex">
            <div class="mb-6 md:w-full">
                <div class="mb-2">
                    <label for="" class="text-base">Longitude Asal</label>
                    <input type="number" step="0.001" class="w-full px-4 py-2 mt-2 border-2 rounded-sm focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="s_longitude">
                </div>
                <div class="mb-2">
                    <label for="" class="text-base">Latitude Asal</label>
                    <input type="number" step="0.001" class="w-full px-4 py-2 mt-2 border-2 rounded-sm focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="s_latitude">
                </div>
                <div class="mb-2">
                    <label for="" class="text-base">Longitude Tujuan</label>
                    <input type="number" step="0.001" class="w-full px-4 py-2 mt-2 border-2 rounded-sm focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="d_longitude">
                </div>
                <div class="mb-2">
                    <label for="" class="text-base">Latitude Tujuan</label>
                    <input type="number" step="0.001" class="w-full px-4 py-2 mt-2 border-2 rounded-sm focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="d_latitude">
                </div>
                <div class="mb-2">
                    <label for="" class="text-base">Description</label>
                    <input type="text" class="w-full px-4 py-2 mt-2 border-2 rounded-sm focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary" v-model="description">
                </div>
            </div>

        </div>

        <div class="max-w-lg mx-auto flex">
            <button type="submit" class="bg-primary text-white py-2 rounded-sm mr-4 grow">Edit</button>
            <RouterLink :to="{ name: 'List' }" class="grow">
                <button type="button" class="bg-red-600 w-full text-white py-2 rounded-sm mx-auto">Kembali</button>
            </RouterLink>
        </div>
    </form>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useCoordinateStore } from '../../stores/coordinate';

let s_longitude = ref(null)
let s_latitude = ref(null)
let d_longitude = ref(null)
let d_latitude = ref(null)
let description = ref(null)

const coor = useCoordinateStore()

const props = defineProps({
    id: {
        type: String
    }
})

const submitForm = () => {
    const objData = {}

    if(s_longitude.value !== coor.edit_s_longitude){
        objData.s_longitude = s_longitude.value
    }
    if(s_latitude.value !== coor.edit_s_latitude){
        objData.s_latitude = s_latitude.value
    }
    if(d_longitude.value !== coor.edit_d_longitude){
        objData.d_longitude = d_longitude.value
    }
    if(d_latitude.value !== coor.edit_d_latitude){
        objData.d_latitude = d_latitude.value
    }
    if(description.value !== coor.editDescription){
        objData.description = description.value
    }

    if(Object.keys(objData).length !== 0){
        coor.editCoordinate(props.id, objData)
    }
    else{
        alert("Lakukan perubahan pada data!")
    }
}

onBeforeMount(async ()=>{
    await coor.getCoordinateDetail(props.id)
    s_longitude.value = coor.edit_s_longitude
    s_latitude.value = coor.edit_s_latitude
    d_longitude.value = coor.edit_d_longitude
    d_latitude.value = coor.edit_d_latitude
    description.value = coor.editDescription
    // console.log("ngecek")
    // console.log(`${longitude.value} ${latitude.value} ${description.value}`)
})
</script>