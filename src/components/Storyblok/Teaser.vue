<template>
  <v-card>
    <!--
    The _editable attribute makes the next
    DOM-element clickable so the side by side editor can
    show the right component.
    -->
    <v-card-title v-editable="blok">
      <h1>
        <!--
        You can access every attribute you
        define in the schema in the blok variable
        -->
        {{ blok.headline }}
        </h1>
    </v-card-title>
    <v-card-title>
        <h2>
          You can create new components like this - to create your own set of components.
      </h2>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ['blok'],
};
</script>
