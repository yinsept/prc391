<template>
  <div>
    <div class="shopping-cart section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Shopping Summery -->
            <table class="table shopping-summery">
              <thead>
                <tr class="main-hading">
                  <th>PRODUCT IMAGE</th>
                  <th>PRODUCT NAME</th>
                  <th class="text-center">UNIT PRICE (USD)</th>
                  <th class="text-center">AMOUNT</th>
                  <th class="text-center">
                    <i class="ti-pencil-alt remove-icon"></i>
                  </th>
                  <th class="text-center">
                    <i class="ti-trash remove-icon"></i>
                  </th>
                </tr>
              </thead>
              <tbody
                v-for="laptop in searchResultLaptops"
                :key="laptop.productId"
              >
                <tr>
                  <td class="image" data-title="No">
                    <img v-bind:src="laptop.image" style="cursor: pointer" />
                  </td>
                  <td class="product-des" data-title="Description">
                    <p class="product-name">
                      <a>{{ laptop.name }}</a>
                    </p>
                    <p class="product-des">
                      Brand: {{ laptop.manufactory.manufactoryName }}
                    </p>
                  </td>
                  <td class="price" data-title="Price">
                    <span>{{ laptop.price }} </span>
                  </td>
                  <td class="qty" data-title="Qty">
                    <span>{{ laptop.amount }} </span>
                  </td>
                  <td class="action" data-title="Remove">
                    <span @click="updateProduct(laptop.productId)"
                      ><i class="ti-pencil-alt remove-icon"></i
                    ></span>
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
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AdminPage",
  computed: mapGetters("laptops",["searchResultLaptops"]),
  mounted() {
    this.seachValue = this.$route.query.searchValue;
    this.fetchLaptopByName(this.seachValue);
  },
  methods: {
    ...mapActions("laptops",["fetchLaptopByName", "deleteProduct"]),
    removeProduct(id) {
      this.deleteProduct(id);
    },
    updateProduct(productId) {
      this.$router.push({
        name: "UpdatePage",
        params: { laptopId: productId },
      });
    },
  },
  data() {
    return {
      seachValue: "",
    };
  },
};
</script>