import storeModule from './store'
require('./dataset_shim');

const VueBootstrapper = {
  install(Vue,options) {
    if (!options || !options.store) {
      throw new Error('Vue Bootstrapper: please, provide a Vuex store in the options object')
    }
    options.store.registerModule('vueBootstrapper', storeModule)
    // Initialize an empty $context object
    Vue.prototype.$context = {};

    // Populate the $context object from the root $el data set
    Vue.prototype.$getContext = function $getContext() {
      if(this.$el){
        const $el = this.$el;
        const dataKeys = Object.keys($el.dataset);

        dataKeys.forEach((key) => {
          const value = $el.dataset[key];

          try {
            this.$context[key] = JSON.parse(value);
          } catch (e) {
            this.$context[key] = value;
          }
        });
      }
    };

    // Call $getContext before the root instance is mounted
    Vue.mixin({
      beforeMount() {
        //add a check to verify the store availability.
        //If externally somebody instances a new vue without the store (ui-element library for example)
        //this can cause an error
        if (this.$store && !this.$store.state.vueBootstrapper.ready) {
          this.$root.$getContext();
          this.$store.commit('vueBootstrapper/SET_READY_STATE')
        }
      }
    });
  }
};

export { VueBootstrapper };
export default VueBootstrapper;
