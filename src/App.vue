<template>
  <div id="app">
    <!-- Header -->
    <header class="header shop">
      <!-- Topbar -->
      <div class="topbar">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-12">
              <!-- Top Left -->
              <div class="top-left">
                <ul class="list-main">
                  <li><i class="ti-headphone-alt"></i> +(84) 123 456 789</li>
                  <li><i class="ti-email"></i> support@eshop.com</li>
                </ul>
              </div>
              <!--/ End Top Left -->
            </div>
            <div class="col-lg-8 col-md-12 col-12">
              <!-- Top Right -->
              <div class="right-content">
                <ul class="list-main">
                  <li v-if="!userInfor">
                    <i class="ti-power-off"></i
                    ><router-link to="/login">Login</router-link>
                  </li>
                  <li v-else>
                    <div @click="logout()" style="cursor: pointer">
                      <i class="ti-power-off"></i><span>Logout</span>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- End Top Right -->
            </div>
          </div>
        </div>
      </div>
      <!-- End Topbar -->
      <div class="middle-inner">
        <div class="container">
          <div class="row">
            <div class="col-lg-2 col-md-2 col-12">
              <!-- Logo -->
              <div class="logo">
                <router-link to="/"
                  ><img src="@/assets/logo3.png"
                /></router-link>
              </div>
              <!--/ End Logo -->
            </div>
            <div class="col-lg-8 col-md-7 col-12">
              <div class="search-bar-top">
                <div class="search-bar">
                  <form @submit.prevent>
                    <input
                      name="search"
                      placeholder="Search Products Here....."
                      type="search"
                      v-model="searchValue"
                    />
                    <button class="btnn" @click="onSearchSubmit()">
                      <i class="ti-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-12">
              <div class="right-bar">
                <div class="sinlge-bar" v-if="userInfor">
                  <a @click="updateInfor()" class="single-icon"
                    ><i class="fa fa-user-circle-o" aria-hidden="true"></i
                  ></a>
                </div>
                <div
                  class="sinlge-bar shopping"
                  v-if="!userInfor || userInfor.role !== 'Admin'"
                >
                  <a @click="moveToCart()" class="single-icon"
                    ><i class="ti-bag"></i
                  ></a>
                  <!-- Shopping Item -->
                  <!--/ End Shopping Item -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Header Inner -->
      <div class="header-inner">
        <div class="container">
          <div class="cat-nav-head">
            <div class="row">
              <div class="col-lg-9 col-12">
                <div class="menu-area">
                  <!-- Main Menu -->
                  <nav class="navbar navbar-expand-lg">
                    <div class="navbar-collapse">
                      <div class="nav-inner">
                        <ul class="nav main-menu menu navbar-nav">
                          <li>
                            <router-link to="/">Home</router-link>
                          </li>
                          <li v-if="!userInfor || userInfor.role !== 'Admin'">
                            <router-link to="/laptopPage">Laptop</router-link>
                          </li>
                          <li v-if="userInfor && userInfor.role === 'Admin'">
                            <router-link to="/adminPage"
                              >Admin</router-link
                            >
                          </li>
                          <li v-if="userInfor && userInfor.role === 'Admin'">
                            <router-link to="/newProduct"
                              >Create New Product</router-link
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  <!--/ End Main Menu -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/ End Header Inner -->
    </header>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapState("laptops", ["laptops"]),
    userInfor: function() {
      return localStorage.USER ? JSON.parse(localStorage.USER) : undefined
    }
  },
  methods: {
    ...mapMutations("laptops", ["setAllLaptops"]),
    ...mapActions("laptops",["fetchLaptopByName"]),
    onSearchSubmit() {
      var user = localStorage.USER ? JSON.parse(localStorage.USER) : undefined
      var path = (user && user.role === "Admin") ? "/adminPage" : "/product";
      this.$router.push({path: path, query: {searchValue: this.searchValue}})
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
      this.$router.go();
    },
    moveToCart() {
      if (localStorage.USER) {
        this.$router.push("/cart");
      } else {
        this.$router.push("/login");
      }
    },
    updateInfor() {
      this.$router.push("/updateUserInfor");
    },
  },
  data() {
    return {
      searchValue: ""
    };
  },
};
</script>
<style>
@import "./css/bootstrap.css";
@import "./css/magnific-popup.min.css";
@import "./css/font-awesome.css";
@import "./css/jquery.fancybox.min.css";
@import "./css/themify-icons.css";
@import "./css/niceselect.css";
@import "./css/animate.css";
@import "./css/flex-slider.min.css";
@import "./css/owl-carousel.css";
@import "./css/slicknav.min.css";
@import "./css/reset.css";
@import "./css/style.css";
@import "./css/responsive.css";
</style>
