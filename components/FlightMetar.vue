<template lang="pug">
h4.mb-0 #[icon(name="tabler:cloud-storm")] METAR info #[small.text-muted (Station may not be available)]
.hstack.gap-2
  nuxt-link.w-100(
    :to="`https://metarr.vercel.app/metar/${flight.departure.icao}`",
    target="_blank"
  )
    b-button.w-100(variant="info") Departure ({{ flight.departure.icao }})
  nuxt-link.w-100(
    :to="`https://metarr.vercel.app/metar/${flight.arrival.icao}`",
    target="_blank"
  )
    b-button.w-100(variant="info") Arrival ({{ flight.arrival.icao }})
</template>

<script setup lang="ts">
const props = defineProps<{
  flight: FlightJson;
}>();
</script>

<style lang="scss" scoped>
h4 {
  font-size: 1.1rem;
}
</style>
