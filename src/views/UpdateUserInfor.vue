<template>
  <section class="shop checkout section">
    <div class="container">
      <div class="col-lg-8 col-12">
        <div class="checkout-form">
          <h2>Make Your Information Update Here</h2>
          <p>Please fill in all fields below</p>
          <!-- Form -->
          <form class="form" method="post" action="#">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12">
                <div class="form-group">
                  <label>Full Name<span>*</span></label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input
                      type="text"
                      name="name"
                      placeholder=""
                      v-model="userInforDetail.fullName"
                    />
                    <span style="color: red">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12">
                <div class="form-group">
                  <label>Email Address<span>*</span></label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input
                      type="email"
                      placeholder=""
                      required="required"
                      v-model="userInforDetail.email"
                    />
                    <span style="color: red">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12">
                <div class="form-group">
                  <label>Phone Number<span></span></label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input
                      type="text"
                      placeholder=""
                      required="required"
                      v-model="userInforDetail.phone"
                    />
                    <span style="color: red">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12">
                <div class="form-group">
                  <label>Address<span></span></label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input
                      type="text"
                      name="address"
                      placeholder=""
                      v-model="userInforDetail.address"
                    />
                    <span style="color: red">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
            </div>
          </form>
          <!--/ End Form -->
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <!-- Button Widget -->
        <div class="single-widget get-button">
          <div class="content">
            <div class="button">
              <button @click="updateInfor(userInforDetail)" class="btn">
                Update
              </button>
            </div>
          </div>
        </div>
        <!--/ End Button Widget -->
      </div>
    </div>
  </section>
</template>
<script>
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { mapActions, mapGetters } from "vuex";
extend("required", {
  ...required,
  message: "Please input this field",
});
export default {
  name: "UpdateUserInfor",
  computed: {
    ...mapGetters("user", ["userInforDetail"]),
  },
  components: {
    ValidationProvider,
  },
  methods: {
    ...mapActions("user", ["fetchUserInforDetail", "updateCurrentInfor"]),
    updateInfor(userInforDetail) {
      this.updateCurrentInfor(userInforDetail).then((response) => {
        console.log(response);
        if (response.status === 204 || response.status === 200) {
          this.check = false;
          alert("Update success!");
        } else {
          this.check = true;
        }
      });
    },
  },
  mounted() {
    this.fetchUserInforDetail();
  },
  data() {
    return {
      check: false,
    };
  },
};
</script>