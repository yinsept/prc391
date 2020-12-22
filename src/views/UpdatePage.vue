<template>
  <div>
    <!-- Start Checkout -->
    <section class="shop checkout section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-12">
            <div class="checkout-form">
              <h2>Make Your Product Update Here</h2>
              <p>Please fill in all information below</p>
              <!-- Form -->
              <form @submit.prevent class="form">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Product Name<span>*</span></label>
                      <input
                        type="text"
                        placeholder=""
                        v-model="laptopDetail.name"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Unit Price<span>*</span></label>
                      <input
                        type="number"
                        placeholder=""
                        required="required"
                        v-model.number="laptopDetail.price"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Product Quantity<span>*</span></label>
                      <input
                        type="number"
                        placeholder=""
                        required="required"
                        v-model.number="laptopDetail.amount"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Assembly Place<span>*</span></label>
                      <input
                        type="text"
                        placeholder=""
                        required="required"
                        v-model="laptopDetail.assemblyPlace"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>CPU<span>*</span></label>
                      <input
                        type="text"
                        placeholder=""
                        required="required"
                        v-model="laptopDetail.cpu"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>RAM<span>*</span></label>
                      <input
                        type="text"
                        placeholder=""
                        required="required"
                        v-model="laptopDetail.ram"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Hard Drive<span>*</span></label>
                      <input
                        type="text"
                        placeholder=""
                        required="required"
                        v-model="laptopDetail.hardDrive"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Screen<span>*</span></label>
                      <input
                        type="text"
                        placeholder=""
                        required="required"
                        v-model="laptopDetail.screen"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Graphic Card<span>*</span></label>
                      <input
                        type="text"
                        placeholder=""
                        required="required"
                        v-model="laptopDetail.graphicCard"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Operating System<span>*</span></label>
                      <input
                        type="text"
                        placeholder=""
                        required="required"
                        v-model="laptopDetail.operatingSystem"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="form-group">
                      <label>Size<span>*</span></label>
                      <input
                        type="text"
                        placeholder=""
                        required="required"
                        v-model="laptopDetail.size"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="search-bar-top">
                      <label>Manufactory<span>*</span></label>
                      <div class="search-bar">
                        <select v-model="laptopDetail.manufactoryId">
                          <option
                            v-for="item in manufactoryList"
                            :key="item.manufactoryId"
                            :value="item.manufactoryId"
                          >
                            {{ item.manufactoryName }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12">
                    <div class="button">
                      <button class="btn" @click="update(laptopDetail)">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <!--/ End Form -->
            </div>
          </div>
          <div class="col-lg-4 col-12">
            <div class="order-details">
              <!-- Button Widget -->
              <div class="single-widget get-button">
                <div class="button">
                  <input type="file" @change="changeImgeLocal" />
                </div>
              </div>
              <!--/ End Button Widget -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--/ End Checkout -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UpdatePage",
  data() {
    return {
      id: -1,
    };
  },
  mounted() {
    this.id = this.$route.params.laptopId;
    this.fetchLaptopDetail(this.id);
    this.fetchListManufactory();
  },
  computed: mapGetters("laptops",["laptopDetail", "manufactoryList"]),
  methods: {
    ...mapActions("laptops",[
      "fetchLaptopDetail",
      "updateProductInfor",
      "fetchListManufactory",
    ]),
    update(laptopDetail) {
      this.updateProductInfor(laptopDetail).then((response) => {
        if (response.status === 204 || response.status === 200) {
          alert("Update product successfull!");
        } else {
          alert("Update product Fail! Please try again!");
        }
      });
    },
    changeImgeLocal(event) {
      this.laptopDetail.image = event.target.files[0];
    },
  },
};
</script>