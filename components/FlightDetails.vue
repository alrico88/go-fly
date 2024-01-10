<template lang="pug">
b-list-group
  b-list-group-item.hstack.gap-2.justify-content-between
    .fw-bold Distance
    div #[span.font-monospace {{ flightDistance }}] nautical miles
  b-list-group-item.hstack.gap-2.justify-content-between
    .fw-bold Bearing
    div #[span.font-monospace {{ flightBearing }}] degrees
  b-list-group-item.hstack.gap-2.justify-content-between
    .fw-bold Elevation Δ
    div #[span.font-monospace {{ elevationChange }}] feet
</template>

<script setup lang="ts">
import bearing from "@turf/bearing";
import distance from "@turf/distance";
import { bearingToAzimuth } from "@turf/helpers";

const props = defineProps<{
  flight: FlightJson;
}>();

const elevationChange = computed(
  () => props.flight.departure.elevation - props.flight.arrival.elevation,
);

const flightBearing = computed(() => {
  const brg = bearing(
    [props.flight.departure.lon, props.flight.departure.lat],
    [props.flight.arrival.lon, props.flight.arrival.lat],
  );

  return Math.floor(bearingToAzimuth(brg));
});

const flightDistance = computed(() =>
  Math.floor(
    distance(
      [props.flight.departure.lon, props.flight.departure.lat],
      [props.flight.arrival.lon, props.flight.arrival.lat],
      {
        units: "nauticalmiles",
      },
    ),
  ),
);
</script>
