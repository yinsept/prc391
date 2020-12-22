<template>
  <div class="modal-content">
    <div class="modal-body">
      <div class="row no-gutters">
        <div
          class="col-lg-6 col-md-12 col-sm-12 col-xs-12"
          style="padding-left: 4vw"
        >
          <img v-bind:src="laptopDetail.image" alt="#" />
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="quickview-content">
            <h2>{{ laptopDetail.name }}</h2>
            <h6>Brand: {{ laptopDetail.manufactory.manufactoryName }}</h6>
            <div class="quickview-ratting-review">
              <div class="quickview-ratting-wrap">
                <div class="quickview-ratting">
                  <i class="yellow fa fa-star"></i>
                  <i class="yellow fa fa-star"></i>
                  <i class="yellow fa fa-star"></i>
                  <i class="yellow fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>
                <a href="#"> (1 customer review)</a>
              </div>
              <div class="quickview-stock">
                <span><i class="fa fa-check-circle-o"></i> in stock</span>
              </div>
            </div>
            <h3>Price: {{ laptopDetail.price }}</h3>
            <div class="quickview-peragraph">
              <p>
                CPU Manufacturer: {{ laptopDetail.cpu }} <br />
                RAM: {{ laptopDetail.ram }} <br />
                Hard drive: {{ laptopDetail.hardDrive }} <br />
                Display size: {{ laptopDetail.screen }} <br />
                Graphic card: {{ laptopDetail.graphicCard }} <br />
                Operating System: {{ laptopDetail.operatingSystem }} <br />
                Size: {{ laptopDetail.size }} <br />
              </p>
            </div>
            <div class="size">
              <div class="row">
                <div class="col-lg-6 col-12">
                  <h5 class="title"></h5>
                </div>
                <div class="col-lg-6 col-12">
                  <h5 class="title"></h5>
                </div>
              </div>
            </div>
            <div class="quantity">
              <!-- Input Order -->
              <div class="input-group">
                <div class="button minus">
                  <button
                    type="button"
                    class="btn btn-primary btn-number"
                    data-type="minus"
                    data-field="quant[1]"
                    @click="minusQuantity()"
                  >
                    <i class="ti-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  name="quant[1]"
                  class="input-number"
                  disabled="disabled"
                  data-min="1"
                  data-max="1000"
                  v-model="numberProduct"
                />
                <div class="button plus">
                  <button
                    type="button"
                    class="btn btn-primary btn-number"
                    data-type="plus"
                    data-field="quant[1]"
                    @click="addQuantity()"
                  >
                    <i class="ti-plus"></i>
                  </button>
                </div>
              </div>
              <!--/ End Input Order -->
            </div>
            <div class="add-to-cart">
              <button class="btn" @click="addToCart(laptopDetail)">
                Add to cart
              </button>
            </div>
            <div class="default-social">
              <h4 class="share-now">Share:</h4>
              <ul>
                <li>
                  <a class="facebook" href="#"
                    ><i class="fa fa-facebook"></i
                  ></a>
                </li>
                <li>
                  <a class="twitter" href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a class="youtube" href="#"
                    ><i class="fa fa-pinterest-p"></i
                  ></a>
                </li>
                <li>
                  <a class="dribbble" href="#"
                    ><i class="fa fa-google-plus"></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal end -->
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ProductDetail",
  data() {
    return {
      numberProduct: 1,
      id: -1,
    };
  },
  mounted() {
    this.id = this.$route.params.laptopId;
    this.fetchLaptopDetail(this.id);
    console.log(this.id);
  },
  methods: {
    ...mapActions("laptops",["fetchLaptopDetail"]),
    addToCart(laptop) {
      var user = localStorage.USER ? JSON.parse(localStorage.USER) : undefined
      if (user) {
        if (!localStorage.CART) {
          var products = [];
          localStorage.CART = JSON.stringify(products);
        }
        products = JSON.parse(localStorage.CART);
        const lap = products.find(
          (item) => item.productId === laptop.productId
        );
        if (lap) {
          lap.quantity = parseInt(lap.quantity) + this.numberProduct;
        } else {
          products.push({ ...laptop, quantity: this.numberProduct });
        }
        localStorage.CART = JSON.stringify(products);
        alert("Added" + laptop.name)
      } else {
        this.$router.push("/login");
      }
    },
    addQuantity() {
      if (this.numberProduct <= 100) {
        this.numberProduct = this.numberProduct + 1;
      } else {
        this.numberProduct = 100;
      }
    },
    minusQuantity() {
      if (this.numberProduct <= 1) {
        this.numberProduct = 1;
      } else {
        this.numberProduct = this.numberProduct - 1;
      }
    },
  },
  computed: {
    ...mapGetters("laptops",["laptopDetail"])
  },
};
</script>