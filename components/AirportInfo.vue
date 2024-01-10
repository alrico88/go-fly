<template lang="pug">
b-list-group
  b-list-group-item.hstack.gap-2.justify-content-between
    .fw-bold Name
    div {{ airport.name }}
  b-list-group-item.hstack.gap-2.justify-content-between
    .fw-bold ICAO
    .font-monospace {{ airport.icao }}
  b-list-group-item.hstack.gap-2.justify-content-between
    .fw-bold IATA
    .font-monospace {{ airport.iata }}
  b-list-group-item.hstack.gap-2.justify-content-between
    .fw-bold Country
    .hstack.gap-2.align-items-center
      img.border(
        :height="15",
        :src="`https://flagcdn.com/h20/${airport.country.toLowerCase()}.png`"
      )
      div {{ formattedCountry }}
  b-list-group-item.hstack.gap-2.justify-content-between(v-if="airport.state")
    .fw-bold State
    div {{ airport.state }}
  b-list-group-item.hstack.gap-2.justify-content-between(v-if="airport.city")
    .fw-bold City
    div {{ airport.city }}
  b-list-group-item.hstack.gap-2.justify-content-between
    .fw-bold Elevation
    div #[span.font-monospace {{ airport.elevation }}] feet
</template>

<script setup lang="ts">
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);

const props = defineProps<{
  airport: AirportJson;
}>();

const formattedCountry = computed(() =>
  countries.getName(props.airport.country, "en"),
);
</script>
