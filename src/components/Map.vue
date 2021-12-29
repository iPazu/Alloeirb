<template>
    <div id="mapContainer" class="basemap">
      <GmapMap class="map"
          :center="{lat:43.66197315524941, lng:1.480322783140464}"
          :zoom="15"
          style="width: 75%; height: 100%"
          :options="{
           styles: myStyles,
           zoomControl: false,
           mapTypeControl: false,
           scaleControl: false,
           streetViewControl: false,
           rotateControl: false,
           fullscreenControl: false,
           clickableIcons: false,

           disableDefaultUi: true
         }"
      >
      <GmapMarker
          :position="coursierpos"
          :clickable="false"
          :draggable="false"
          :icon="{ url: require('../assets/bluelocation.png')}"
      />
        </GmapMap>
    </div>
</template>

<script>
import * as order from "@/script/Order";



export default {

  name: "Map",
  data() {
    return {

      coursierpos: { lat: 43.66197315524941, lng: 1.480322783140464 },
      intervalLocation: null,
      myStyles:[
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }],
    };
  },
  methods: {
    refreshLocation(){
      console.log("Refreshing location")
      order.getLocation(this.$route.params.orderid, (location) => {
        console.log(location)
      });
    },
  },
  mounted() {
    this.intervalLocation = setInterval(this.refreshLocation, 5000);
  },
  beforeDestroy() {
    clearInterval(this.intervalLocation);
  }
};
</script>

<style scoped>
.basemap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1000px;
}
.map{

}
</style>