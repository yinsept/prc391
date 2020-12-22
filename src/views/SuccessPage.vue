<template>
  <div>
    <div class="shopping-cart section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title">
              <h2>Check out success!</h2>
              <div class="button5">
                <button class="btn" @click="countinueShopping">
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SuccessPage",
  methods: {
    countinueShopping() {
      this.$router.push("/");
    },
  },
};
</script>