<template lang="pug">
.row(v-if="!flight")
  .col
    b-alert.mb-0(variant="light", :model-value="true")
      template(v-if="loading")
        b-spinner
      template(v-else) Please enter the desired settings and click "Generate Flight"
.row.g-3(v-if="!loading && flight != null")
  .col-md-7.order-1.order-md-2
    .vstack.gap-3
      .map-container
        flight-map(:flight="flight")
      flight-metar(:flight="flight")
  .col.order-2.order-md-1
    b-card(:variant="cardVariant")
      .vstack.gap-3
        .row
          .col
            h3 #[icon(name="tabler:plane-departure")] Departure
            airport-info(:airport="flight.departure")
        .row
          .col
            h3 #[icon(name="tabler:plane-arrival")] Arrival
            airport-info(:airport="flight.arrival")
        .row
          .col
            h3 #[icon(name="material-symbols:airplane-ticket-outline-sharp")] Flight Details
            flight-details(:flight="flight")
</template>

<script setup lang="ts">
const props = defineProps<{
  flight: FlightJson | null;
  loading: boolean;
}>();

const colorMode = useColorMode();

const cardVariant = computed(() =>
  colorMode.value === "light" ? "light" : "secondary",
);
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.3rem;
}

.map-container {
  height: 500px;
}
</style>
