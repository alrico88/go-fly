<template lang="pug">
.row
  .col
    ul.list-unstyled.mb-0
      li #[icon(name="tabler:user")] Made by #[nuxt-link(:to="portfolioLink", v-bind="linkOpts") Alberto Rico]
      li #[icon(name="bi:box")] Uses #[nuxt-link(:to="packageLink", v-bind="linkOpts") random-flight-generator] under the hood
      li #[icon(name="tabler:code")] Code on #[nuxt-link(:to="repoLink", v-bind="linkOpts") Github]
      li #[icon(name="tabler:coffee")] Found it useful? #[nuxt-link(:to="supportLink", v-bind="linkOpts") Support me]
  .col-md-2
    color-mode
</template>

<script setup lang="ts">
const portfolioLink = "https://www.alrico.es";
const repoLink = "https://github.com/alrico88/go-fly";
const packageLink = "https://www.npmjs.com/package/random-flight-generator";
const supportLink = "https://www.buymeacoffee.com/albertorico";

const linkOpts = {
  target: "_blank",
};
</script>
