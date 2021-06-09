<template>
  <div class="container">
    <Search />
    <Results />
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    />
    <EmptyResults v-if="emptyResults" />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Results from "@/components/Results.vue";
import EmptyResults from "@/components/EmptyResults.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "Home",
  components: { Search, Results, Loading, EmptyResults },
  setup() {
    const store = useStore();
    const results = computed(() => store.state.users);
    const isLoading = computed(() => store.state.isLoading);
    const emptyResults = computed(() => store.state.emptyResults);
    return {
      results,
      emptyResults,
      isLoading,
    };
  },
};
</script>

