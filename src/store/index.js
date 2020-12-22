import Vue from "vue";
import Vuex from "vuex";
import laptops from "./modules/laptops";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    laptops,
    user
  }
});
