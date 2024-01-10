<template lang="pug">
l-map.w-100.h-100.border.rounded(
  ref="mapRef",
  :center="[0, 0]",
  :zoom="5",
  world-copy-jump,
  @ready="() => (mapReady = true)"
)
  l-tile-layer(:url="tileUrl", :attribution="tileAttribution")
  l-marker(:lat-lng="[flight.departure.lat, flight.departure.lon]")
  l-marker(:lat-lng="[flight.arrival.lat, flight.arrival.lon]")
  l-geo-json(:geojson="flightGeoJSON")
</template>

<script setup lang="ts">
import { featureCollection } from "@turf/helpers";
import greatCircle from "@turf/great-circle";
import is from "@sindresorhus/is";
import { getGeoJSONBBox } from "bbox-helper-functions";

const props = defineProps<{
  flight: FlightJson;
}>();

const colorMode = useColorMode();

const tileUrl = computed(() =>
  colorMode.value === "light"
    ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
);

const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const flightGeoJSON = computed(() => {
  if (is.nullOrUndefined(props.flight)) {
    return featureCollection([]);
  } else {
    return featureCollection([
      greatCircle(
        [props.flight.departure.lon, props.flight.departure.lat],
        [props.flight.arrival.lon, props.flight.arrival.lat],
      ),
    ]);
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapRef = templateRef<any>("mapRef");

const mapReady = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bbox = computed(() => getGeoJSONBBox(flightGeoJSON.value as any));

watch([bbox, mapReady], ([arr]) => {
  if (is.emptyArray(arr)) {
    return;
  }

  const [minX, minY, maxX, maxY] = arr;

  mapRef.value?.leafletObject.fitBounds([
    [minY, minX],
    [maxY, maxX],
  ]);
});
</script>
