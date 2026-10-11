<template lang="pug">
.w-100.h-100.border.rounded.overflow-hidden
  mgl-map(
    :map-style="mapStyle",
    :bounds="bounds",
    :fit-bounds-options="{ padding: 40 }",
    height="100%"
  )
    mgl-navigation-control
    mgl-marker(:coordinates="[flight.departure.lon, flight.departure.lat]")
    mgl-marker(:coordinates="[flight.arrival.lon, flight.arrival.lat]")
    mgl-geo-json-source(source-id="flight", :data="flightGeoJSON")
      mgl-line-layer(layer-id="flight", :paint="linePaint")
</template>

<script setup lang="ts">
import {
  MglMap,
  MglNavigationControl,
  MglMarker,
  MglGeoJsonSource,
  MglLineLayer,
} from "@indoorequal/vue-maplibre-gl";
import type { LngLatBoundsLike } from "maplibre-gl";
import greatCircle from "@turf/great-circle";
import bbox from "@turf/bbox";

const props = defineProps<{
  flight: FlightJson;
}>();

const colorMode = useColorMode();

const mapStyle = computed(() =>
  colorMode.value === "light"
    ? "https://tiles.openfreemap.org/styles/liberty"
    : "https://tiles.openfreemap.org/styles/dark",
);

const linePaint = {
  "line-color": "#0D74CE",
  "line-width": 3,
};

const flightGeoJSON = computed(() =>
  greatCircle(
    [props.flight.departure.lon, props.flight.departure.lat],
    [props.flight.arrival.lon, props.flight.arrival.lat],
  ),
);

const bounds = computed<LngLatBoundsLike>(() => {
  const [minX, minY, maxX, maxY] = bbox(flightGeoJSON.value);

  return [
    [minX, minY],
    [maxX, maxY],
  ];
});
</script>
