<template>
  <div>
        <div class="product-area section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title">
              <h2>Item Found</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="product-info">
              <div class="nav-main"></div>
              <div class="tab-content" id="myTabContent">
                <!-- Start Single Tab -->
                <div class="tab-pane fade show active" id="man" role="tabpanel">
                  <div class="tab-single">
                    <div class="row">
                      <laptop-card  v-for="laptop in searchResultLaptops" :key="laptop.productId" 
                      :laptop = "laptop"></laptop-card>
                    </div>
                  </div>
                </div>
                <!--/ End Single Tab -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ServicePart />
    <FooterPage />
  </div>
</template>
<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import LaptopCard from "@/components/LaptopCard.vue";
import FooterPage from "@/components/FooterPage.vue";
import ServicePart from "@/components/ServicePart.vue";

export default {
  name: "Product",
  computed: mapGetters("laptops",["searchResultLaptops"]),
  components: {
    LaptopCard,
    FooterPage,
    ServicePart,
  },
  methods: {
    ...mapActions("laptops",["fetchLaptopByName"]),
  },
  mounted() {
    this.seachValue = this.$route.query.searchValue;
    this.fetchLaptopByName(this.seachValue);
  },
  watch: {
    "$route" : function(){
      this.fetchLaptopByName(this.seachValue);
    }
  },
   data() {
    return { 
      seachValue : ""
    };
  },
};
</script>
