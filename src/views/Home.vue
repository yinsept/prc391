<template>
  <div>
   <TrendingItem/>
   <ServicePart/>
   <FooterPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import TrendingItem from "@/components/TrendingItem.vue";
import FooterPage from "@/components/FooterPage.vue";
import ServicePart from "@/components/ServicePart.vue";

export default {
  name: "Home",
  components: {
    TrendingItem,
    FooterPage,
    ServicePart
  },
};
</script>
