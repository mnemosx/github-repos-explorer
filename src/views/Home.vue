<template>
  <div class="container">
    <Search />
    <div v-if="!route.query.q">
      <h1>
        Type a GitHub user or login name in the search bar above to browse user
        repositories
      </h1>
      <div ref="lottieContainer" class="lottie-container"></div>
    </div>
    <SearchHistory
      v-if="!route.query.q && localStorage.getItem('searchHistory')"
      @searchPicked="onSearchPicked($event)"
    />
    <!-- FIXME: v-if on <Results /> instead of inside it -->
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
import SearchHistory from "@/components/SearchHistory.vue";
import animationData from "@/assets/lottie-home.json";
import lottie from "lottie-web";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref, onMounted } from "vue";

export default {
  name: "Home",
  components: { Search, Results, Loading, EmptyResults, SearchHistory },
  setup() {
    const store = useStore();
    const results = computed(() => store.state.users);
    const isLoading = computed(() => store.state.isLoading);
    const emptyResults = computed(() => store.state.emptyResults);
    const route = useRoute();

    const lottieContainer = ref(null);
    onMounted(() => {
      lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
      store.commit("initializeStore");
    });

    const onSearchPicked = (val) => {
      store.commit("setSearchInput", val);
      store.dispatch("fetchUsers");
    };

    return {
      results,
      emptyResults,
      isLoading,
      route,
      lottieContainer,
      onSearchPicked,
      localStorage,
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  @include sm {
    font-size: 1.5em;
  }
}
.lottie-container {
  width: 300px;
  height: 300px;
  margin: 0 auto 5em;
  @include sm {
    width: 200px;
    height: 200px;
    margin-bottom: 2em;
  }
}
</style>