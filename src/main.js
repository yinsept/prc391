import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyDBUahihGmQxG4CLiyuvCqXKn-J-R85nnw",
  authDomain: "prc391-52c94.firebaseapp.com",
  projectId: "prc391-52c94",
  storageBucket: "prc391-52c94.appspot.com",
  messagingSenderId: "597238372687",
  appId: "1:597238372687:web:c7c3a2aefd368d262d4d3a",
  measurementId: "G-51P84THZLH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
