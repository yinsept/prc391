<template>
  <div>
    <section class="hero-slider">
      <!-- Single Slider -->
      <div class="single-slider">
        <div class="container">
          <div class="row no-gutters">
            <div class="col-lg-9 offset-lg-3 col-12">
              <div class="text-inner">
                <div class="row">
                  <div class="col-lg-7 col-12">
                    <div class="hero-text">
                      <h1><span>PC Gaming</span>CHRISTMAS IS COMING TO TOWN</h1>
                      <p>
                        Buy pc gaming <br />
                        Get 50% sale off <br />
                        Only on Christmas day
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/ End Single Slider -->
    </section>
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
                      <LaptopCards />
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
  </div>
</template>

<script>
// @ is an alias to /src
import LaptopCards from "@/components/LaptopCard.vue";

export default {
  name: "SearchResult",
  components: {
    LaptopCards,
  },
};
</script>