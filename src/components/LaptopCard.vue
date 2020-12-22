<template>
  <div class="col-xl-3 col-lg-4 col-md-4 col-12">
    <div class="single-product">
      <div class="product-img">
        <div @click="gotodetail(laptop.productId)">
          <img class="default-img" v-bind:src="laptop.image" alt="#" />
        </div>
        <div class="button-head">
          <div class="product-action-2">
            <span title="Add to cart" @click="addToCart(laptop)">
              <h6>Add to cart <i class="ti-shopping-cart remove-icon"></i></h6>
            </span>
          </div>
        </div>
      </div>
      <div class="product-content">
        <h5>{{ laptop.name }}</h5>
        <div class="product-price">
          <span
            ><h6>Brand: {{ laptop.manufactory.manufactoryName }}</h6></span
          >
          <span>Price: {{ laptop.price }} USD</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions} from "vuex";
export default {
  name: "LaptopCards",
  props: ["laptop"],
  computed: {
    ...mapGetters("laptops",["allLaptops"]),
  },
  mounted() {
    this.fetchAllLaptop();
  },
  methods: {
    ...mapActions("laptops",["fetchAllLaptop"]),
    gotodetail(productId) {
      this.$router.push({
        name: "ProductDetail",
        params: { laptopId: productId },
      });
    },
    addToCart(laptop) {
      var user = localStorage.USER ? JSON.parse(localStorage.USER) : undefined
      if(user){
        if (!localStorage.CART) {
        var products = [];
        localStorage.CART = JSON.stringify(products);
      }
      products = JSON.parse(localStorage.CART);
      const lap = products.find((item) => item.productId === laptop.productId);
      if (lap) {
        lap.quantity = parseInt(lap.quantity) + 1;
      } else {
        products.push({ ...laptop, quantity: 1 });
      }
      localStorage.CART = JSON.stringify(products);
      alert("Added " + laptop.name)
      }else{
        this.$router.push("/login");
      }
    },
  },
};
</script>