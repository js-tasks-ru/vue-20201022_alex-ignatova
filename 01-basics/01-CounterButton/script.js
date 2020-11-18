import Vue from './vue.esm.browser.js';

const app = new Vue({
  el: '#app',

  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    increaseCounter() {
      this.counter += 1;
    },
  },
});
