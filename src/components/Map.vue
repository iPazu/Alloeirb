<template>

  <div id="mapContainer" class="basemap"></div>

</template>

<script>
import mapboxgl from "mapbox-gl";
import * as order from "@/script/Order";
export default {
  name: "Map",
  data() {
    return {
      accessToken: "pk.eyJ1IjoiaXBhenUiLCJhIjoiY2t4b25rYTdoMXprbjJ4cWs4Zjc4Z24waSJ9.maHkMBz8VRxaRZxbfLNfuA",
      map: '',
      intervalLocation: '',
    };
  },
  methods: {
    refreshLocation(){
      console.log("Refreshing location")
      order.getLocation(this.$route.params.orderid, (location) => {
        console.log(location)
        new mapboxgl.Marker({
          color: "#F08080",
        }).setLngLat([location.longitude, location.latitude])
            .addTo(this.map);

        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            new mapboxgl.Marker()
                .setLngLat([position.coords.longitude,position.coords.latitude])
                .addTo(this.map);
          });

        }
      });

    },
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    this.map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [ 1.4840,43.6584 ], //-0.6070,44.8063
      zoom: 12,
      maxBounds: [
        [ 1.2,43], //-0.75  ,43.5
        [ 1.6,44], //-0.45,45.5
      ],
    });
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, "top-right");
    this.intervalLocation = setInterval(this.refreshLocation, 5000);


  },
  beforeDestroy() {
    clearInterval(this.intervalLocation);
  }
};
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 100%;
}
</style>
