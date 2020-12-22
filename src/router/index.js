import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/LoginPage.vue";
import ProductDetail from "../views/ProductDetail.vue";
import LaptopPage from "../views/LaptopPage.vue";
import Product from "../views/Product.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import AdminPage from "../views/AdminPage.vue";
import UpdatePage from "../views/UpdatePage.vue";
import SuccessPage from "../views/SuccessPage.vue";
import UpdateUserInfor from "../views/UpdateUserInfor.vue";
import NewProduct from "../views/NewProduct.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/detail",
    name: "ProductDetail",
    component: ProductDetail
  },
  {
    path: "/laptopPage",
    name: "LaptopPage",
    component: LaptopPage
  },
  {
    path: "/product",
    name: "Product",
    component: Product
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout
  },
  {
    path: "/adminPage",
    name: "AdminPage",
    component: AdminPage
  },
  {
    path: "/updatePage",
    name: "UpdatePage",
    component: UpdatePage
  },
  {
    path: "/success",
    name: "SuccessPage",
    component: SuccessPage
  },
  {
    path: "/updateUserInfor",
    name: "UpdateUserInfor",
    component: UpdateUserInfor
  },
  {
    path: "/newProduct",
    name: "NewProduct",
    component: NewProduct
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
