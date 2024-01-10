<template lang="pug">
header.row
  .col
    h1.fw-bold #[icon(name="icon-park-solid:in-flight")] Go Fly!
    p.lead.text-muted A random flight generator
    p Enter your desired settings to generate a random flight for flight simulator fun!
.row
  .col
    .section-header
      h3 Minimum/Maximum Distance
    p Your flight's distance will be between these two values (in nautical miles).
.row
  .col
    .section-header
      h3 Departure/Arrival Airport
      nuxt-link(to="https://www.world-airport-codes.com/", target="_blank") Airport code lookup
    p Use the airport ICAO or IATA codes to designate an airport, otherwise a random one will be generated.
    p.text-small.text-muted Example: KMIA
.row
  .col
    .section-header
      h3 Include/Exclude Countries
      nuxt-link(to="https://www.iban.com/country-codes", target="_blank") Country code lookup
    p Enter the 2-letter country code(s) to restrict your airports to these countries.
    p.text-small.text-muted.mb-0 Example: BR, US, IT
</template>

<style scoped lang="scss">
h3 {
  font-size: 1rem;
  font-weight: bold;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  justify-content: space-between;

  h3 {
    margin-bottom: 0;
  }
}
</style>
