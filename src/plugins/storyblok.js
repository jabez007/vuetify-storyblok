import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import upperFirst from 'lodash/upperFirst';
// eslint-disable-next-line import/no-extraneous-dependencies
import camelCase from 'lodash/camelCase';
// 1. Require the Storyblok client
import StoryblokClient from 'storyblok-js-client';
// eslint-disable-next-line import/no-extraneous-dependencies
import StoryblokVue from 'storyblok-vue';

// 3. Initialize the client with the preview token so we can access our API easily
// from your space dashboard at https://app.storyblok.com
Vue.prototype.$storyapi = new StoryblokClient({
  // 2. Set your token
  // https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
  accessToken: process.env.VUE_APP_STORYBLOK_ACCESSTOKEN,
});

Vue.use(StoryblokVue);

Vue.mixin({
  data: () => ({
    story: null,
  }),
  created() {
    const { name } = this.$options;
    if ((name || '').startsWith('Storyblok-')) {
      const slug = name.substring(10);
      // 4. Initialize the Storyblok Client Bridge to allow us to subscribe to events
      // from the editor itself.
      window.storyblok.init({
        accessToken: process.env.VUE_APP_STORYBLOK_ACCESSTOKEN,
      });
      window.storyblok.on('change', () => {
      // this will indicate to load the home story, exchange that with the full slug of your content
        // either it is the page URL or hardcoded as in the example below
        this.getStory(slug, 'draft');
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          this.getStory(slug, 'draft');
        } else {
          this.getStory(slug, 'published');
        }
      });
    }
  },
  methods: {
    getStory(slug, version) {
      this.$storyapi.get(`cdn/stories/${slug}`, {
        version,
      })
        .then((response) => {
          this.story = response.data.story;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});

const storyblokComponents = require.context(
  // The relative path of the components folder
  '@/components/Storyblok',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /\w+\.(vue|js)$/,
);

storyblokComponents.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = storyblokComponents(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''),
    ),
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig,
  );
});
