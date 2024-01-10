<template lang="pug">
vite-pwa-manifest
.container-md.py-4
  .vstack.gap-4
    .row.row-cols-1.row-cols-md-2.g-3
      .col
        the-intro
      aside.col
        the-generator(
          v-model:flight="generatedFlight",
          v-model:loading="loading",
          v-model:has-error="hasError"
        )
    b-alert.mb-0(:model-value="hasError", variant="danger") There was an error generating the flight.
    the-flight(:flight="generatedFlight", :loading="loading")
    hr.my-2
    the-credits
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Go Fly!",
  description: "A free online Random Flight Generator",
  keywords: "random,flight,generator,free",
});

const loading = ref(false);
const hasError = ref(false);

const generatedFlight = ref<null | FlightJson>(null);
</script>
