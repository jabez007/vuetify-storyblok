import Vue from 'vue';
import StoryblokClient from 'storyblok-js-client';
// eslint-disable-next-line import/no-extraneous-dependencies
import StoryblokVue from 'storyblok-vue';

// Initialize the client with the preview token so we can access our API easily
// from your space dashboard at https://app.storyblok.com
Vue.prototype.$storyapi = new StoryblokClient({
  // https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
  accessToken: process.env.VUE_APP_STORYBLOK_ACCESSTOKEN,
});
Vue.use(StoryblokVue);
