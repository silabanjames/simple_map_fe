<template>
    <div class="w-full mb-6 py-4 text-2xl font-bold text-center">
        <h1>Simple Map</h1>
    </div>
    <div class="px-12">
        <table class="table-fixed w-full mb-16 ">
            <thead class="text-center">
                <tr class="border-slate-200 border-b-2">
                    <th class="font-normal w-1/12 pb-2">Source Longitude</th>
                    <th class="font-normal w-1/12 pb-2">Source Latitude</th>
                    <th class="font-normal w-1/12 pb-2">Destination Longitude</th>
                    <th class="font-normal w-1/12 pb-2">Destination Latitude</th>
                    <th class="font-normal w-4/12 pb-2">Description</th>
                    <th class="font-normal w-4/12 pb-2">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-slate-200 border-b-2" v-for="coordinate in coor.coordinates">
                    <td class="text-center px-2">
                        {{ coordinate.s_longitude }}
                    </td>
                    <td class="text-center px-2">
                        {{ coordinate.s_latitude }}
                    </td>
                    <td class="text-center px-2">
                        {{ coordinate.d_longitude }}
                    </td>
                    <td class="text-center px-2">
                        {{ coordinate.d_latitude }}
                    </td>
                    <td>
                        {{ coordinate.description }}
                    </td>
                    <td class="text-center px-2">
                        <RouterLink :to="{ name: 'Edit', params: {id: coordinate.id} }">
                            <button class="bg-sky-600 px-6 py-3 my-2 mr-4 rounded hover:bg-sky-400 text-white">
                                Edit
                            </button>
                        </RouterLink>
                        <button class="bg-green-600 px-6 py-3 my-2 mr-4 rounded hover:bg-green-400 text-white" @click="changeMapStatus(coordinate)">
                            Show
                        </button>
                        <button class="bg-red-600 px-6 py-3 my-2 mr-4 rounded hover:bg-red-400 text-white" @click="coor.deleteCoordinate(coordinate.id)">
                            Hapus
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="showMap">
        <Map 
            :s_longitude="s_longitude"
            :s_latitude="s_latitude"
            :d_longitude="d_longitude"
            :d_latitude="d_latitude"
            >
        </Map>
    </div>
</template>

<script setup>
// import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"
import Map from '@/components/Map.vue'
import { map, tileLayer, latLng, MapOptions} from "leaflet"
import 'leaflet/dist/leaflet.css';
import { useCoordinateStore } from '../../stores/coordinate';
import { onBeforeMount, ref } from "vue";

const coor = useCoordinateStore()

let s_latitude = ref(null)
let s_longitude = ref(null)
let d_latitude = ref(null)
let d_longitude = ref(null)
let showMap = ref(false)

const changeMapStatus = (coordinate) => {
    // Jika Map Belum ditampilkan, perbaharui nilai lat lng terlebih dahulu baru tampilkan peta
    // Jika Map telah ditampilkan, tutup saja petanya secara langsung
    if(!showMap.value){
        s_latitude.value = parseFloat(coordinate.s_latitude)
        s_longitude.value = parseFloat(coordinate.s_longitude)
        d_latitude.value = parseFloat(coordinate.d_latitude)
        d_longitude.value = parseFloat(coordinate.d_longitude) 
    }

    showMap.value = !showMap.value
}

onBeforeMount(()=>{
    coor.getCoordinateList()
})
</script>