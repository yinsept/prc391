<template>
  <div>
    <!-- Breadcrumbs -->
    <div class="breadcrumbs">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="bread-inner">
              <ul class="bread-list">
                <li>
                  <router-link to="/"
                    >Home<i class="ti-arrow-right"></i
                  ></router-link>
                </li>
                <li class="active">
                  <router-link to="/checkout">Checkout</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Breadcrumbs -->
    <!-- Start Checkout -->
    <section class="shop checkout section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-12">
            <div class="checkout-form">
              <h2>Make Your Checkout Here</h2>
              <p>Please register in order to checkout more quickly</p>
              <!-- Form -->
              <form class="form" method="post" action="#">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Full Name<span>*</span></label>
                      <input
                        type="text"
                        name="name"
                        placeholder=""
                        disabled="disabled"
                        v-model="userInforDetail.fullName"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Email Address<span>*</span></label>
                      <input
                        type="email"
                        placeholder=""
                        disabled="disabled"
                        required="required"
                        v-model="userInforDetail.email"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Phone Number<span>*</span></label>
                      <input
                        type="number"
                        placeholder=""
                        required="required"
                        disabled="disabled"
                        v-model="userInforDetail.phone"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Address<span>*</span></label>
                      <input
                        type="text"
                        name="address"
                        placeholder=""
                        disabled="disabled"
                        required="required"
                        v-model="userInforDetail.address"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <!--/ End Form -->
            </div>
          </div>
          <div class="col-lg-4 col-12">
            <div class="order-details">
              <!-- Order Widget -->
              <div class="single-widget">
                <h2>CART TOTALS</h2>
                <div class="content">
                  <ul>
                    <li>
                      Sub Total<span>{{ cartTotal }}<i>&ensp;USD</i></span>
                    </li>
                    <li>(+) Shipping<span>Free</span></li>
                    <li class="last">
                      Total<span>{{ cartTotal }}<i>&ensp;USD</i></span>
                    </li>
                  </ul>
                </div>
              </div>
              <!--/ End Order Widget -->
              <!-- Button Widget -->
              <div class="single-widget get-button">
                <div class="content">
                  <div class="button">
                    <button
                      @click="proceedToCheckout(userInforDetail.accountId)"
                      class="btn"
                    >
                      proceed to checkout
                    </button>
                    <span v-if="check">Check out fail. Please try again!</span>
                  </div>
                </div>
              </div>
              <!--/ End Button Widget -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--/ End Checkout -->
    <ServicePart />
    <FooterPage />
  </div>
</template>
<script>
import FooterPage from "@/components/FooterPage.vue";
import ServicePart from "@/components/ServicePart.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Checkout",
  components: {
    FooterPage,
    ServicePart,
  },
  computed: {
    ...mapGetters("user", ["userInforDetail"]),
    cartTotal() {
      let total = 0;
      this.products.forEach((item) => {
        total += item.quantity * item.price;
      });
      return total;
    },
  },
  methods: {
    ...mapActions("user", ["fetchUserInforDetail", "checkoutCart"]),
    proceedToCheckout(id) {
      let userId = id;
      let listProducts = [];
      this.products.forEach((item) => {
        let lap = {
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        };
        listProducts.push(lap);
      });
      let transaction = {
        accountId: userId,
        details: listProducts,
      };
      this.checkoutCart(transaction).then((response) => {
        console.log(response)
        if (response.status === 201) {
          localStorage.removeItem("CART");
          this.$router.push("/success");
          this.check = false;
        } else {
          this.check = true;
        }
      });
    },
  },
  mounted() {
    this.fetchUserInforDetail();
    this.products = JSON.parse(localStorage.CART);
  },
  data() {
    return {
      products: [],
      check: false,
    };
  },
};
</script>