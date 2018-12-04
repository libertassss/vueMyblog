// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Toast from 'muse-ui-toast';

Vue.use(Toast);

Vue.use(MuseUI);

Vue.config.productionTip = false
Vue.prototype.$URL = process.env.API_HOST
Vue.prototype.$toast=Toast;
axios.defaults.headers.post['Content-Type'] = 'application/json'


Vue.prototype.getData=function(){
  var _this=this;
  axios({
    method:arguments[2],
    url:_this.$URL+arguments[0],
    data:arguments[1],
  }).then((res)=>{
    arguments[3](res);
  }).catch((err)=>{
    arguments[4](err);
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
