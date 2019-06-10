<template>
  <v-container fluid fill-height>
    <component :blok="story.content" :is="story.content.component"></component>
  </v-container>
</template>

<script>
export default {
  name: 'Storyblok-home',
};
</script>
