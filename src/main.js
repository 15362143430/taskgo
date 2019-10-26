import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import '../theme/index.css'
Vue.use(ElementUI);

<<<<<<< HEAD
import axios from 'axios';
=======
import axios from './http';
>>>>>>> 第二次
Vue.prototype.axios = axios;

Vue.filter('dateTimeFormat', (value) => {
  var time = new Date(+value);
  var rightTwo = (v) => {
    v = '0' + v
    return v.substring(v.length - 2, v.length)
  }
  if (time == null) return;
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  return year + '-' + rightTwo(month) + '-' + rightTwo(date) + ' ' + rightTwo(hours) + ':' + rightTwo(minutes) + ':' + rightTwo(seconds);
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
