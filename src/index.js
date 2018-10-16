require('./dataset_shim');

const VueBootstrapper = {
  install(Vue) {
    // Initialize an empty $context object
    Vue.prototype.$context = {};

    // Populate the $context object from the root $el data set
    Vue.prototype.$getContext = function $getContext() {
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
    };

    // Call $getContext before the root instance is mounted
    Vue.mixin({
      beforeMount() {
        if (!this.$parent) {
          this.$getContext();
        }
      }
    });
  }
};

export { VueBootstrapper };
export default VueBootstrapper;
