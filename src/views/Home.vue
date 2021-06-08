<template>
  <div class="container">dis a home</div>
  <Search />
  <Results />
</template>

<script>
import Search from "@/components/Search.vue";
import Results from "../components/Results.vue";

export default {
  name: "Home",
  components: { Search, Results },
};
</script>

<style scoped lang="scss">
</style>
