<template>
  <div>
    <TrendingItem />
    <ServicePart />
    <FooterPage />
  </div>
</template>
<script>
import TrendingItem from "@/components/TrendingItem.vue";
import FooterPage from "@/components/FooterPage.vue";
import ServicePart from "@/components/ServicePart.vue";
export default {
  name: "LaptopPage",
  components: {
    TrendingItem,
    FooterPage,
    ServicePart
  },
};
</script>