<template>
    <div id="map" class="w-3/4 h-[50vh] mx-auto mb-10"></div>
</template>

<script setup>
import { onMounted } from "vue";

import L from "leaflet"
import 'leaflet-measure/dist/leaflet-measure'
import 'leaflet-routing-machine/dist/leaflet-routing-machine'

import 'leaflet/dist/leaflet.css';
import 'leaflet-measure/dist/leaflet-measure.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const props = defineProps({
    s_latitude: { type: Number },
    s_longitude: { type: Number },
    d_latitude: { type: Number },
    d_longitude: { type: Number }
})

onMounted(async ()=>{
    let map = L.map('map').setView([(props.s_longitude + props.d_longitude) / 2, (props.s_latitude + props.s_longitude)], 13);

    // const bounds = new L.LatLngBounds([[props.s_longitude, props.s_latitude], [props.d_longitude, props.d_latitude]])
    // map.fitBounds(bounds)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let iconNav = L.icon({
        iconUrl: "src/assets/img/pacman.png",
        iconSize: [30, 30]
    })

    let marker = L.marker([props.s_latitude, props.s_longitude], { icon: iconNav }).addTo(map)

    L.control.measure({
        primaryLengthUnit: "kilometer",
        secondaryLengthUnit: "meter",
        primaryAreaUnit: "sqmeters",
        secondaryAreaUnit: undefined
    }).addTo(map)

    L.Routing.control({
        waypoints: [
            L.latLng(props.s_latitude, props.s_longitude),
            L.latLng(props.d_latitude, props.d_longitude)
        ]
    }).on('routesfound', function(e){
        // console.log(e)
        e.routes[0].coordinates.forEach((coord, index) => {
            setTimeout(() => {
                marker.setLatLng([coord.lat, coord.lng])
            }, 1 * index);
        })
    })
    .addTo(map);

})
</script>