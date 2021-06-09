<template>
  <div class="container">{{ results }}</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Results",
  setup() {
    const store = useStore();
    const results = computed(() => store.state.users);
    return {
      results,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
