import Vue from 'vue';
import SemanticUI from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import App from './App.vue';

/* eslint-disable tree-shaking/no-side-effects-in-initialization */

Vue.use(SemanticUI);

new Vue({
    el: '#app',
    render: (h) => h(App)
});

/* eslint-enable tree-shaking/no-side-effects-in-initialization */
