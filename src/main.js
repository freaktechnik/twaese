import Vue from 'vue';
import SemanticUI from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import App from './App.vue';

Vue.use(SemanticUI);

new Vue({
    el: '#app',
    render: (h) => h(App)
});
