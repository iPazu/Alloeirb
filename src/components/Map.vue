<template>
  <div class="mapview">
    <h2 class="time" v-on="getTime">Arrivée dans environ {{time}} minutes</h2>
    <div id="mapContainer" class="basemap"></div>

  </div>

</template>

<script>
import mapboxgl from "mapbox-gl";
import * as order from "@/script/Order";
import * as localisation from "@/script/Localisation";


export default {
  name: "Map",
  props: {
    position: []
  },
  data() {
    return {
      accessToken: "pk.eyJ1IjoiaXBhenUiLCJhIjoiY2t4b25rYTdoMXprbjJ4cWs4Zjc4Z24waSJ9.maHkMBz8VRxaRZxbfLNfuA",
      map: '',
      intervalLocation: null,
      intervalTime: null,
      time: 0
    };
  },
  methods: {
    refreshLocation(){
      console.log("Refreshing location")
      order.getLocation(this.$route.params.orderid, (location) => {
        console.log(location)
        new mapboxgl.Marker({
          color: "#F08080",
        }).setLngLat([1.4840, 43.6584 ])
            .addTo(this.map);
      });

    },
    arrivalTime(){
      this.time--;
      if(this.time === 0){
        this.time+=2
      }
    },
    getTime(time){
      let minutes = Math.floor(time/60)
      return minutes+2
    }
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    console.log(this.position)
    this.map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center:  this.position , //-0.6070,44.8063
      zoom: 14,
      maxBounds: [
        [ 1.2,43], //-0.75  ,43.5
        [ 1.6,44], //-0.45,45.5
      ],
    });
    new mapboxgl.Marker({
      color: "rgb(37,234,155)",
    }).setLngLat(this.position)
        .addTo(this.map);

    localisation.getLocation((localisation) => {
      console.log("got loc")
      console.log(localisation.features[0].geometry.coordinates)
      console.log(localisation.features[0].properties.segments[0].duration)

      this.time = this.getTime(localisation.features[0].properties.segments[0].duration)
      this.map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates':  localisation.features[0].geometry.coordinates
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

      this.intervalTime = setInterval(this.arrivalTime, 60000);

    })
    //this.intervalLocation = setInterval(this.refreshLocation, 5000);


  },
  beforeDestroy() {
    clearInterval(this.intervalLocation);
    clearInterval(this.intervalTime);

  }
};
</script>

<style scoped>
.mapview{
  height: 1000px;
}
.basemap {
  width: 100%;
  height: 100%;
}
.time{
  padding-bottom: 10px;
}
</style>
