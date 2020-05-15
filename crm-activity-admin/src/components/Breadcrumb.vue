<template>
  <div class="breadcrumb">
    <Breadcrumb>
        <BreadcrumbItem v-for="(item,index) in breadcrumb" :key="index">{{item}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "breadcrumb",
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters(["breadcrumb"])
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.breadcrumb {
  width: 60%;
  height: 100%;
  text-align: left;
  display: flex;
  align-items: center;
}
</style>