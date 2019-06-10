<template>
  <v-layout justify-center align-center v-editable="blok">
  <template v-for="item in blok.body">
    <component :key="item._uid" :blok="item" :is="item.component"></component>
  </template>
  </v-layout>
</template>

<script>
export default {
  props: ['blok'],
};
</script>
