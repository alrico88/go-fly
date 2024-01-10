<template lang="pug">
b-form(@submit.prevent="calculate")
  .vstack.gap-3.w-100
    .fw-bold All settings are optional
    .row.row-cols-1.row-cols-sm-2.g-2
      .col
        b-form-group(label="Minimum Distance")
          b-form-input(
            type="number",
            v-model="params.minDistance",
            placeholder="In nautical miles"
          )
      .col
        b-form-group(label="Maximum Distance")
          b-form-input(
            type="number",
            v-model="params.maxDistance",
            placeholder="In nautical miles"
          )
    .row.row-cols-1.row-cols-sm-2.g-2
      .col
        b-form-group(label="Departure Airport")
          b-form-input(
            v-model="departure",
            placeholder="Enter ICAO or IATA code"
          )
      .col
        b-form-group(label="Arrival Airport")
          b-form-input(
            v-model="arrival",
            placeholder="Enter ICAO or IATA code"
          )

    b-form-group(label="Include Countries")
      b-form-tags(
        v-model="params.countries.include",
        placeholder="Enter country codes"
      )
    b-form-group(label="Exclude Countries")
      b-form-tags(
        v-model="params.countries.exclude",
        placeholder="Enter country codes"
      )
    b-form-checkbox(v-model="params.majorAirports") Major airports only (recommended)
    b-button.w-100(variant="primary", type="submit", :disabled="loading") #[icon(name="mdi:airplane-cog")] Generate Flight
</template>

<script setup lang="ts">
const generatedFlight = defineModel<FlightJson | null>("flight", {
  required: true,
});

const loading = defineModel<boolean>("loading", {
  required: true,
});

const hasError = defineModel<boolean>("hasError", {
  required: true,
});

async function calculate() {
  try {
    generatedFlight.value = null;
    hasError.value = false;
    loading.value = true;

    const data = await $fetch<FlightJson>("/api/flight", {
      query: {
        minDistance: params.minDistance,
        maxDistance: params.maxDistance,
        departure: params.departure,
        arrival: params.arrival,
        includeCountries: params.countries.include.map((d: string) =>
          d.toUpperCase(),
        ),
        excludeCountries: params.countries.exclude.map((d: string) =>
          d.toUpperCase(),
        ),
        majorAirportsOnly: params.majorAirports,
      },
    });

    generatedFlight.value = data;
  } catch (err) {
    hasError.value = true;

    console.error(err);
  } finally {
    loading.value = false;
  }
}

const params = reactive({
  minDistance: "",
  maxDistance: "",
  departure: "",
  arrival: "",
  countries: {
    include: [],
    exclude: [],
  },
  majorAirports: true,
});

const departure = useUpperRef(params, "departure");
const arrival = useUpperRef(params, "arrival");
</script>
