<template>
  <!-- Shopping Cart -->
  <div>
    <div v-if="products.length == 0" class="shopping-cart section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title">
              <h2>No item in cart</h2>
              <div class="button5">
                <button class="btn" @click="countinueShopping">
                  Go shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="shopping-cart section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Shopping Summery -->
            <table class="table shopping-summery">
              <thead>
                <tr class="main-hading">
                  <th>PRODUCT</th>
                  <th>NAME</th>
                  <th class="text-center">UNIT PRICE</th>
                  <th class="text-center">QUANTITY</th>
                  <th class="text-center">TOTAL</th>
                  <th class="text-center">
                    <i class="ti-trash remove-icon"></i>
                  </th>
                </tr>
              </thead>
              <tbody v-for="laptop in products" :key="laptop.id">
                <tr>
                  <td class="image" data-title="No">
                    <img
                      v-bind:src="laptop.image"
                      @click="gotodetail(laptop.productId)"
                      style="cursor:pointer"
                    />
                  </td>
                  <td class="product-des" data-title="Description">
                   <p class="product-name"><a @click="gotodetail(laptop.productId)">{{ laptop.name}}</a></p>
                    <p class="product-des">
                      Brand: {{ laptop.manufactory.manufactoryName }}
                    </p>
                  </td>
                  <td class="price" data-title="Price">
                    <span>{{ laptop.price }} USD</span>
                  </td>
                  <td class="qty" data-title="Qty">
                    <!-- Input Order -->
                    <div class="input-group">
                      <div class="button minus">
                        <button
                          type="button"
                          class="btn btn-primary btn-number"
                          data-type="plus"
                          @click="minusQuantity(laptop)"
                        >
                          <i class="ti-minus"></i>
                        </button>
                      </div>
                      <input
                        type="text"
                        name="quant[3]"
                        class="input-number"
                        disabled="disabled"
                        data-min="1"
                        data-max="100"
                        v-model="laptop.quantity"
                      />
                      <div class="button plus">
                        <button
                          type="button"
                          class="btn btn-primary btn-number"
                          data-type="plus"
                          @click="addQuantity(laptop)"
                        >
                          <i class="ti-plus"></i>
                        </button>
                      </div>
                    </div>
                    <!--/ End Input Order -->
                  </td>
                  <td class="total-amount" data-title="Total">
                    <span>{{ laptop.quantity * laptop.price }} <i>USD</i></span>
                  </td>
                  <td class="action" data-title="Remove">
                    <span @click="removeProduct(laptop.productId)"
                      ><i class="ti-trash remove-icon"></i
                    ></span>
                  </td>
                </tr>
              </tbody>
            </table>
            <!--/ End Shopping Summery -->
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <!-- Total Amount -->
            <div class="total-amount">
              <div class="row">
                <div class="col-lg-8 col-md-5 col-12">
                  <div class="left">
                    <div class="coupon"></div>
                    <div class="checkbox"></div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-7 col-12">
                  <div class="right">
                    <ul>
                      <li>
                        Cart Subtotal<span
                          >{{ cartTotal }}<i>&ensp;USD</i></span
                        >
                      </li>
                      <li>Shipping<span>Free</span></li>
                      <li class="last">
                        You Pay<span>{{ cartTotal }}<i>&ensp;USD</i></span>
                      </li>
                    </ul>
                    <div class="button5">
                      <button class="btn" @click="gotoCheckout">
                        Checkout
                      </button>
                      <button class="btn" @click="countinueShopping">
                        Continue shopping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/ End Total Amount -->
          </div>
        </div>
      </div>
    </div>
    <!--/ End Shopping Cart -->
  </div>
</template>
<script>
export default {
  name: "Cart",
  computed: {
    cartTotal() {
      let total = 0;
      this.products.forEach((item) => {
        total += item.quantity * item.price;
      });
      return total;
    },
  },
  methods: {
    gotoCheckout() {
      this.$router.push("/checkout");
    },
    countinueShopping() {
      this.$router.push("/");
    },
    addQuantity(laptop) {
      laptop.quantity += 1;
      localStorage.CART = JSON.stringify(this.products);
    },
    minusQuantity(laptop) {
      laptop.quantity -= 1;
      if (laptop.quantity <= 1) {
        laptop.quantity = 1;
      }
      localStorage.CART = JSON.stringify(this.products);
    },
    removeProduct(productId) {
      this.products = this.products.filter((item) => item.productId !== productId);
      localStorage.CART = JSON.stringify(this.products);
    },
    gotodetail(productId) {
      this.$router.push({
        name: "ProductDetail",
        params: { laptopId: productId },
      });
    },
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.products = JSON.parse(localStorage.CART);
    console.log(this.products);
  },
};
</script>