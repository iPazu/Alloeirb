<template>
 <div>
   <h2 class="time" >Arrivée dans environ {{$store.state.deliveryTime}} minutes</h2>

   <div class="mapview">
     <div id="mapContainer" class="basemap"></div>
   </div>
 </div>


</template>

<script>
import mapboxgl from "mapbox-gl";
import store from "@/store";
export default {
  name: "Map",
  props: {
    position: [],
    path: []
  },
  data() {
    return {
      accessToken: "pk.eyJ1IjoiaXBhenUiLCJhIjoiY2t4b25rYTdoMXprbjJ4cWs4Zjc4Z24waSJ9.maHkMBz8VRxaRZxbfLNfuA",
      map: '',
      intervalLocation: null,
      intervalTime: null,
      coursierMarker: null,
    };
  },
  methods: {
    refreshLocation(){
      console.log("Refreshing location")
        let location = this.$store.state.coursierLocation
        console.log(location)
        this.coursierMarker.setLngLat([location[1], location[0] ])

    },
    getMiddle(lat1,lat2,lon1,lon2){
      lat1 = parseFloat(lat1)
      lat2 = parseFloat(lat2)

      lon1 = parseFloat(lon1)
      lon2 = parseFloat(lon2)

      let Bx = Math.cos(lat2) * Math.cos(lon2-lon1);
      let By = Math.cos(lat2) * Math.sin(lon2-lon1);
      let latMid = Math.atan2(Math.sin(lat1) + Math.sin(lat2),
          Math.sqrt( (Math.cos(lat1)+Bx)*(Math.cos(lat1)+Bx) + By*By ) );
      let lonMid = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);
      console.log("diplaying middle")
      console.log(lonMid)
      console.log(latMid)

      return [latMid,lonMid]
    },
    updateDeliveryTime(){

      store.commit("setDeliveryTime", this.$store.state.deliveryTime-1)
      if(this.$store.state.deliveryTime === 0){
        store.commit("setDeliveryTime", this.$store.state.deliveryTime+2)
      }

    },
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    console.log(this.position)
    let location = this.$store.state.coursierLocation

    this.map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center:  this.getMiddle(this.position[0], location[1],this.position[1], location[0]) , //-0.6070,44.8063
      zoom: 13,

    });
    //setting home marker
    new mapboxgl.Marker({
      color: "rgb(37,234,155)",
    }).setLngLat(this.position)
        .addTo(this.map);
    //setting coursier marker
    console.log("from map")
    console.log(location[1])
    console.log(this.path)
    this.coursierMarker = new mapboxgl.Marker({
      color: "#F08080",
    }).setLngLat([location[1], location[0] ])
        .addTo(this.map);


    this.map.on('load', () => {
      this.map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates':  [...this.path]
          }
        }
      });
      this.map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': 'rgba(33,129,186,0.6)',
          'line-width': 6,
        }
      });
    })

      this.intervalTime = setInterval(this.updateDeliveryTime, 60000);
      this.intervalLocation = setInterval(this.refreshLocation, 5000);
  },
  beforeDestroy() {
    clearInterval(this.intervalLocation);
    clearInterval(this.intervalTime);

  }
};
</script>

<style scoped>
.mapview{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
}
.basemap {
  width: 100%;
  height: 100%;
}

.time{
  padding-bottom: 10px;
}
</style>
